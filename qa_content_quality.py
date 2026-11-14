#!/usr/bin/env python3
"""Content/trust regression checks for the WishingASR AdSense remediation release."""
from pathlib import Path
from bs4 import BeautifulSoup
import re, sys
ROOT=Path(__file__).resolve().parent
GUIDES=[
'anniversary-wishes.html','birthday-wishes.html','birthday-wishes-english.html','birthday-wishes-hindi.html',
'chhath-puja-wishes.html','christmas-wishes.html','diwali-wishes.html','eid-wishes.html','english-wishes.html',
'good-morning-wishes.html','good-night-wishes.html','hindi-wishes.html','hinglish-wishes.html','holi-wishes.html',
'love-messages.html','national-days.html','new-year-wishes.html','raksha-bandhan-wishes.html','wedding-wishes.html',
'whatsapp-status-captions.html']
errors=[]
parsed={}
for filename in GUIDES:
    path=ROOT/filename
    if not path.exists():
        errors.append(f'missing guide: {filename}')
        continue
    soup=BeautifulSoup(path.read_text(encoding='utf-8'),'html.parser')
    parsed[filename]=soup
    if not soup.select_one('.editorial-meta'):
        errors.append(f'{filename}: missing editorial attribution')
    if len(soup.find_all('h1')) != 1:
        errors.append(f'{filename}: expected one H1')
    if not soup.select_one('link[rel="canonical"]'):
        errors.append(f'{filename}: missing canonical')
    if not soup.select_one('main'):
        errors.append(f'{filename}: missing main content')
# Editorial specificity checks on the pages that previously contained generic shared blocks.
expected={
'birthday-wishes-english.html':'Birthday messages for different relationships',
'birthday-wishes-hindi.html':'रिश्ते के अनुसार संबोधन और शब्द चुनें',
'chhath-puja-wishes.html':'छठ पूजा के संदेश में श्रद्धा और संवेदनशीलता रखें',
'good-morning-wishes.html':'सुबह का संदेश समय और रिश्ते के हिसाब से भेजें',
'good-night-wishes.html':'A good-night message should be gentle and pressure-free',
'love-messages.html':'Choose words that respect the relationship',
'new-year-wishes.html':'Make a New Year wish hopeful without adding pressure',
'whatsapp-status-captions.html':'Write for the phone screen, not only for the caption box',
}
for filename,heading in expected.items():
    soup=parsed.get(filename)
    if soup and not any(h.get_text(' ',strip=True)==heading for h in soup.select('.editorial-specific h2')):
        errors.append(f'{filename}: missing page-specific advice section')
# The specific editorial paragraphs/CTA text should not have copy-pasted long duplicates.
long_text={}
for filename,soup in parsed.items():
    for node in soup.select('p, li'):
        text=' '.join(node.get_text(' ',strip=True).split())
        if len(text)>100:
            long_text.setdefault(text,[]).append(filename)
for text,files in long_text.items():
    if len(files)>1:
        errors.append(f'repeated long paragraph/list item across {files}: {text[:100]}')
# Confirm the About page describes real product capabilities and truthful content/storage practices.
about=BeautifulSoup((ROOT/'about.html').read_text(encoding='utf-8'),'html.parser')
about_text=about.get_text(' ',strip=True).lower()
for phrase in ['20 designs','english, hindi or hinglish','processed in the browser','not synced','does not send each wish request to an ai service','correction']:
    if phrase not in about_text:
        errors.append(f'about.html missing product/transparency detail: {phrase}')
# Blog should contain practical, distinct guidance and an attribution note.
blog=BeautifulSoup((ROOT/'blog.html').read_text(encoding='utf-8'),'html.parser')
blog_text=blog.get_text(' ',strip=True).lower()
for phrase in ['before and after','create a greeting card from the message','how wishingasr prepares its message examples']:
    if phrase not in blog_text:
        errors.append(f'blog.html missing practical editorial section: {phrase}')
if not blog.select_one('.editorial-meta'):
    errors.append('blog.html missing editorial attribution')
# Keep policy, contact and parent-company utility pages free of ad requests.
for filename in ['contact.html','privacy.html','terms.html','aa-group.html','about.html']:
    if 'pagead2.googlesyndication.com/pagead/js/adsbygoogle.js' in (ROOT/filename).read_text(encoding='utf-8'):
        errors.append(f'{filename}: advertising loader should not run on this utility/trust page')
# Privacy policy has been revised to explain browser storage and advertising separately.
privacy=BeautifulSoup((ROOT/'privacy.html').read_text(encoding='utf-8'),'html.parser')
privacy_text=privacy.get_text(' ',strip=True).lower()
for phrase in ['local storage','session storage','advertising technology is separate','last updated: 14 november 2026']:
    if phrase not in privacy_text:
        errors.append(f'privacy.html missing updated privacy explanation: {phrase}')
if errors:
    print('FAIL: content-quality checks')
    print('\n'.join('- '+e for e in errors))
    sys.exit(1)
print(f'PASS: {len(parsed)} guides have editorial attribution and one H1; page-specific content is present; no repeated long guide paragraphs; About, Blog and Privacy explain product/editorial/storage practices.')
