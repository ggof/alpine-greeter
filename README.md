# Alpine greeter
## What is it?
Alpine greeter is a simple webkit2 greeter theme. For the moment, it has 0 configurability (appart from you hacking it!)

Be indulgent! this theme was made in half a day :) If you find any bugs, feel free to open an issue.

## How do I install it?
Simple!
- clone this repository;
- copy the whole directory to `/usr/share/lightdm-webkit/themes/alpine`
- Set webkit2 as your greeter in `/etc/lightdm/lightdm.conf`;
- set it as your theme in `/etc/lightdm/lightdm-webkit2-greeter.conf`. To do so, change this line: `webkit_theme = alpine`
- restart lightdm with `sudo killall lightdm`. Caution! this will kill all opened applications.

That's it! you'll now be using alpine-greeter as your default greeter.
