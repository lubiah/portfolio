---
title: Python script to automatically set your computer's time
image: https://ik.imagekit.io/kudadam/blog/setting-time-python/hero
description: Learn how to make a python script which can set your computer's time correctly whenever it goes wrong
category: programming
excerpt: Setting your computer's time whenever it goes wrong can be soo boring... Fortunately, you can automate the process
tags:
  - python
  - windows
date: 2021-07-14
---

Setting your computer's time whenever something goes wrong might be tedious... Fortunately, the procedure can be automated.

When the CMOS battery inside my computer expired a few months ago, I had a problem with my computer's time. I had to set it on each boot, which was tedious, so I decided to write a Python script to automate the entire process.

## How it Works?

So, here's how the script works.

```mermaid
graph TB;

style A fill:#63B8FF, stroke:#000000, stroke-width:2px, stroke-array: 5;
style B fill:#FFB766, stroke:#000000, stroke-width:2px;
style C fill:#FFB766, stroke:#000000, stroke-width:2px;
style D fill:#ECECEC, stroke:#000000, stroke-width:2px;
style E fill:#FF5858, stroke:#000000, stroke-width:2px;
style F fill:#63B8FF, stroke:#000000, stroke-width:2px, stroke-dasharray: 5;

A((On Boot))
B{Internet Connection}
C((Make API Call))
D[Set Time]
E(Sleep 5 minutes)
F((Check Again))

A --> B
B -->|Yes| C
C --> D
B -->|No| E
E --> F
F --> B
```

On boot, it makes a call to an API to get the current time based on the IP address. If there's no internet connection, it waits and tries again in 5 minutes. When it finally gets the time, it sets the computer's time.

## Writing the code

Here's the code for the script.

```python
import requests
from time import sleep
import json
import re
from subprocess import Popen

def set_current_time():
  """Function to return the current time"""
  try:
    res = requests.get("http://worldtimeapi.org/api/ip")
    data = res.text
    time_regex = r"\d+:\d+:\d+"
    datetime =  json.loads(data)['datetime']
    date = re.search(time_regex,datetime).group()
    Popen(['time',date],shell = True)
  except requests.exceptions.ConnectionError:
    sleep(3000)
    set_current_time()

set_current_time()
```

So that's the program's code. Using a regular expression, we obtain the date and time. The subprocess module is then used to execute a shell command, which sets the time. If a request is made to the API and no internet connection is available, it will wait 3000 seconds (5 minutes) before making another call to the server.

When you are done, save this file with a `.pyw` extension instead of `.py`, this will prevent the application from launching the console when it is running.
Finally, place this file inside `%appdata%/Microsoft/Windows/Start Menu/Startup`.
Restart your computer and see the magic.