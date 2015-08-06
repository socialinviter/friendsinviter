# Friends Inviter
Reach new audiences and users with efficiency and consistency unparalleled by other plugins. Friends Inviter allows your business to promote through multiple social networks at once like Facebook, Google, Twitter, Xing, and more, without going through the pain of individually posting on each one. Generate more traffic, more revenue, and more connections, at a fraction of the effort and hassle.

For more info: http://socialinviter.com/#!/friendsinviter

Documentation: http://socialinviter.com/#!/fidoc

Interactive console: http://socialinviter.com/#!/console

To customize look & feel: http://socialinviter.com/#!/account

```
$(document).ready(function () {
    friendsinviter.load({
        "target": "socialinviter-FI",
        "callbacks": {
            "loaded": function (service, data) {
                console.log(service, data);
            },
            "send": function (event,selected) {
                console.log(event, selected);
            }
        },
    });
});
```
#Trial Key:
Get trial license key from here (http://socialinviter.com/#!/trial)

#Settings:
To make use of the below configuration, please replace the configuration at the end of friendsinviter.js with below
```
$(document).ready(function () {
    friendsinviter.load({
        "target": "socialinviter-FI",
        "callbacks": {
            "loaded": function (service, data) {
                console.log(service, data);
            },
            "send": function (event,selected) {
                console.log(event, selected);
            }
        },
    });
});
```
If you want to set the "click" event of Friends Inviter to your custom icons, please use as below:
```
<img src="your icon url here" onclick="processor_FI.auth('twitter','friendsinviter','icon')" >
```

For each service:
```
For Twitter:
    friendsinviter.auth('twitter','friendsinviter','icon')
For Google:
    friendsinviter.auth('google','friendsinviter','icon')
For Facebook:
    friendsinviter.auth('facebook','friendsinviter','icon')
For Xing:
    friendsinviter.auth('xing','friendsinviter','icon')
```

To close the friends inviter plugin
```
//Close friends inviter plugin
friendsinviter.close();
```

To get all selected sevice, use below
```
//To get the selected service
friendsinviter.getService();
```

To get all imported friends, use below
```
//To get the friends object
friendsinviter.getAllFriends();
//TO get array of friends
friendsinviter.getAllFriends().friends;
```

To get all selected friends, use below
```
//To get all selected friends
friendsinviter.getSelectedFriends();
```

To customize the plugin content
```
//{0} and {1} are placeholders
friendsinviter.load({
    "target": "socialinviter-FI",
    "content": {
        "step1": {
            "title": "Connect with people you know on {0}.",
            "description": "We found {0} people from your friend list.",
            "selected": "{0} Selected",
            "selectall": "Select all",
            "validation": {
                "selectfriend": "Please select a friend to send message"
            },
            "button": {
                "refresh": "Refresh",
                "proceed": "Proceed"
            }
        },
        "step2": {
            "title": "Send invitation/message to your friends",
            "note": "Note: Seperate emails by semicolon(';')",
            "to": "To",
            "subject": "Subject",
            "message": "Message",
            "validation": {
                "subject": "Enter subject",
                "message": "Enter message"
            },
            "button": {
                "back": "Back",
                "send": "Send"
            }
        },
        "navigation": "Step {0} of {1}"
    }
});
```


