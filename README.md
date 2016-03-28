# Friends Inviter - SocialInviter
Invite/send invitation to friends from social networks such as Twitter, Google, Xing and Facebook. The script imports friends details such as name, id, addresses and picture. Completely painless and easy to integrate in your website.

For more info: https://socialinviter.com/friendsinviter.html

Documentation: https://socialinviter.com/inviter.aspx#!/fiplugindoc

Trial license: https://socialinviter.com/inviter.aspx#!/trial

Download code for ASP.net, PHP and JAVA: https://socialinviter.com/download.aspx

#Settings:

```
    <div class="socialinviter" type="friendsinviter"></div>
```

To initialize the plugin

```
    var licenses = "Your license key here"; //replace your license key
    var SIConfiguration = {
        "path": {
            "authpage": "http://localhost:8080/oauth.html" //replace the web url of oauth.html
        }
    }
    var fileref=document.createElement("script");fileref.setAttribute("type","text/javascript");
    fileref.setAttribute("id","apiscript");fileref.setAttribute("src","//socialinviter.com/all.js?keys="+licenses);
    try{document.body.appendChild(fileref)}catch(a){document.getElementsByTagName("head")[0].appendChild(fileref);}
    var loadInitFlg=0,socialinviter,loadConf=function(){window.setTimeout(function(){$(document).ready(function(){loadInitFlg++;
    socialinviter?socialinviter.load(SIConfiguration):15>loadInitFlg&&window.setTimeout(loadConf,200)})},
    250)};window.setTimeout(loadConf,200);
```





