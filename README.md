WARNING
==
<del>
Now gcleaner can actually replace google link but in vain!

those google links still load!
</del>

Now gcleaner can remove scripts(also stop loading) referring http://ajax.googleapis.com 

But cannot feed page with equivalent scripts!

I am struggling with [ContentPolocy](https://developer.mozilla.org/en-US/docs/Mozilla/Tech/XPCOM/Reference/Interface/nsIContentPolicy) to solve it. 


Gcleaner
===

a firefox addon for replacing google link to speed page loading.

As every Chinese know, Google has been blocked, which causes some websites that refer google js and font load toooo slow.

so this addon is here.

Develop
===

This addon use [Mozilla SDK](https://developer.mozilla.org/en-US/Add-ons/SDK) for developing

<del>Besides, I use [360 common lib](http://libs.useso.com/) to replace google links. </del>


TO DO
===

1. After remove google script, feed page with equivalent scripts!
2. a panel for user configuration
