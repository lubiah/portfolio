---
title: How to make a letter counter in Python
description: Learn how to write a simple programme that counts the number of times each letter appears in a string
image: https://ik.imagekit.io/kudadam/blog/letter-counter-python/hero
excerpt: Learn how to write a simple programme that counts the number of times each letter appears in a string
date: 2021-12-29
tags:
  - python
  - sololearn
---


This blog post is about a problem I found on [Sololearn](https://www.sololearn.com). In this problem, you need to write a simple program. The program should take a text and return a dictionary. The dictionary should show how many times each letter appears in the text.

We'll write a Python function that takes a string and returns a dictionary with the number of times each letter appears.

## The code

```python
def letter_counter(text):
    dict = {}
    for i in text:
        dict[i] = text.count(i)
    return dict
```

We created a function `letter_counter` which accepts a string as its parameter. Inside the function, we create an empty dictionary called `dict`.

In the next line, we iterate through all the characters in the `text` variable. We then use the current character in the loop as the key. Then we use the `.count` method of the string class to find the number of occurrences of the current letter and assign it as the value of the key (which is the current character).
Then finally, we return the `dict` variable.

## Testing the function

So let's test the function we just created with this string `hello world`.

```python
text = "hello world"
print(letter_counter(text))
```

```shell {no_frame=true}
{'h': 1, 'e': 1, 'l': 3, 'o': 2, ' ': 1, 'w': 1, 'r': 1, 'd': 1}  #[tl! reindex(null)]
```

The function works fine, but there is one minor issue.
If you carefully examine the output, you will notice that the function found the number of occurrences for whitespaces, whitespaces are not letters.


## Modified Code

Let's modify the code so that it only counts only letters.

```python
from string import ascii_letters
def letter_counter(text):
    dict = {}
    for i in text:
        if i in ascii_letters:
            dict[i] = text.count(i)
    return dict
```

If you re-run the function, you will realise it excludes all non-letters from the dictionary.

We imported the `ascii_letters` constant from the string module. Then before adding a character to the `dict` variable, we check if the current character is in the letters constant. If it is, we add it, meaning it's a letter. Else, we exclude it.
