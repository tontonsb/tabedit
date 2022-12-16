# Tab Editor

This is an old learning project of mine. I learned a lot through this, but in
particular this was my first experience with PHP and the canvas. Only some
basic features are implemented like adding and removing notes, doing line
breaks and bar breaks (4/4 only). Hell, even rests seem to be unsupported :D

The editor is built using three layers of canvases — the sheet, the numbers
and the editing cursor are all different layers and can be redrawn separately.
The rest of the solutions are rather plain and done in the most manual way
imaginable :)

I learned most of this stuff (except PHP tho) from some books that 
[@Larzs](https://github.com/Larzs) lent me.

The project is left mostly verbatim as it was in 2013 when I switched computers
and emailed it to myself for keeping. However I felt the need for a few changes
here (seen in the latest commits):

- disable the backend interactions, because I'm not hosting a server and the
PHP here is probably the epitome of vulnerability;
- add support for some keycodes corresponding to + and - keys, as I have no
numpad keys on my laptop now.
