/*
Social Inviter
Copyright (c) 2014  www.socialinviter.com
You can use the script on you website for free but this comment part should not be removed.
version 1.5 (July 29, 2015)
*/
var friendsinviter = (function () {
    var config = {
        servicepanel: {
            type: "",
            target: "popup",
            alignment: "vertical",
            path: {
                css: "./",
                js: "./"
            },
            position: {
                left: "wall",
                top: "wall"
            },
            callbacks: undefined
        },
        contactspanel: {

        }
    };
    var contentObj = { "step1": { "title": "Connect with people you know on {0}.", "description": "We found {0} people from your friend list. Select the people you'd like to connect to.", "selected": "{0} Selected", "selectall": "Select all", "validation": { "selectfriend": "Please select a friend to send message" }, "button": { "refresh": "Refresh", "proceed": "Proceed"} }, "step2": { "title": "Send invitation/message to your friends", "note": "Note: Seperate emails by semicolon(';')", "to": "To", "subject": "Subject", "message": "Message", "validation": { "subject": "Enter subject", "message": "Enter message" }, "button": { "back": "Back", "send": "Send"} }, "navigation": "Step {0} of {1}" };
    var invalidkey = "";
    var getConfig = function () {
        return config;
    }
    var setConfig = function (conf) {
        var flagIconLoaderFI = 0;
        processor_FI.init();
        if (conf) {
            if (conf.alignment || conf.type || conf.position) {
                flagIconLoaderFI = 1;
            }
        }
        modalSIFI.init();
        if (conf) {
            if (conf.target)
                config.servicepanel.target = conf.target;
            else
                config.servicepanel.target = "popup";

            if (conf.alignment)
                config.servicepanel.alignment = conf.alignment;
            else
                config.servicepanel.alignment = "horizontal";

            if (conf.path) {
                if (conf.path.css) {
                    config.servicepanel.path.css = conf.path.css;
                }
                if (conf.path.js) {
                    config.servicepanel.path.js = conf.path.js;
                }
            }

            if (conf.subject) {
                config.servicepanel.subject = conf.subject
            }
            else {
                config.servicepanel.subject = "Lets spread the word!";
            }
            if (conf.content) {
                config.servicepanel.content = $.extend({}, contentObj, conf.content);
            }
            else {
                config.servicepanel.content = contentObj;
            }
            if (conf.message) {
                config.servicepanel.message = conf.message
            }
            if (conf.facebooklink) {
                config.servicepanel.facebooklink = conf.facebooklink;
            }
            else {
                config.servicepanel.facebooklink = window.location.href;
            }
            if (conf.showsearch == false) {
                config.servicepanel.showsearch = conf.showsearch;
            }
            else {
                config.servicepanel.showsearch = true;
            }
            if ($("#socialinviter-FI-template").length > 0) {
                config.servicepanel.showmodal = conf.showmodal;
                $(document).ready(function () {
                    //$(".modal-SI-FI").addClass("nomodal");
                    $("#socialinviter-FI-template").find(".modal-SI-FI").css({ "position": "relative", "z-index": 0 });
                });
            }
            else {
                config.servicepanel.showmodal = true;
                $(document).ready(function () {
                    //$(".modal-SI-FI-BG").show();
                    //$(".modal-SI-FI").removeClass("nomodal");
                    $("body").prepend($("#socialinviter-FI-template").remove());
                });
            }
            if (conf.callbacks) {
                config.callbacks = {};
                if (conf.callbacks.proceed)
                    config.callbacks.proceed = conf.callbacks.proceed
                if (conf.callbacks.send)
                    config.callbacks.send = conf.callbacks.send
                if (conf.callbacks.back)
                    config.callbacks.back = conf.callbacks.back
                if (conf.callbacks.loaded)
                    config.callbacks.loaded = conf.callbacks.loaded

            }
            if (conf.position) {
                if (conf.position.left)
                    config.servicepanel.position.left = conf.position.left;
                else
                    config.servicepanel.position.left = "";
                if (conf.position.top)
                    config.servicepanel.position.top = conf.position.top;
                else
                    config.servicepanel.position.top = "";
                if (conf.position.right)
                    config.servicepanel.position.right = conf.position.right;
                else
                    config.servicepanel.position.right = "";
                if (conf.position.bottom)
                    config.servicepanel.position.bottom = conf.position.bottom;
                else
                    config.servicepanel.position.bottom = "";
            }
            if (conf.type == "slide") {
                config.servicepanel.type = conf.type;
                config.servicepanel.target = "popup";
            }
            else if (conf.type == "full") {
                config.servicepanel.type = conf.type;
            }
            else
                config.servicepanel.type = "";
        }
        else {
            console.log("Input configuration missing");
        }
        if (flagIconLoaderFI == 1) {
            configureServicePanel();
        }
    }
    var services = [
        {
            title: "Twitter",
            desc: "Message social friends",
            classRef: "twitter"
        },
        {
            title: "Facebook",
            desc: "Message social friends",
            classRef: "facebook"
        },
        {
            title: "Google",
            desc: "Message Google friends",
            classRef: "google"
        },
        {
            title: "Xing",
            desc: "Message social friends",
            classRef: "xing"
        }]
    var configureServicePanel = function () {
        $(document).ready(function () {
            if (config.servicepanel.target == "popup")
                $("body").append(buildServicePanel());
            else {
                //'socialinviter-FI'
                $("#" + config.servicepanel.target).ready(function () {
                    if ($("#" + config.servicepanel.target).length > 0)
                        $("#" + config.servicepanel.target).prepend(buildServicePanel());
                    else
                        $("#" + config.servicepanel.target).html(buildServicePanel());
                });
            }
            window.setTimeout(attachEvents, 500);
        });
    }
    var attachEvents = function () {
        if (config.servicepanel.type == "slide") {
            $(".FI-SI-Holder").find(".FI-SI-services").unbind("mouseenter").unbind("mouseleave");
            $(".FI-SI-Holder").find(".FI-SI-services").mouseenter(function () {
                $(this).find(".FI-SI-text").fadeIn("slow").addClass("FI-SI-text-lines");
            }).mouseleave(function () {
                $(this).find(".FI-SI-text").addClass("FI-SI-text-nolines").removeClass("FI-SI-text-lines")
            });
        }
        if ((config.servicepanel.type != "slide") && (config.servicepanel.type != "full")) {
            if ($(".FI-SI-i").eq(0).css("margin-left") != "14px")
                showTextAnimation();
        }

    }
    var showTextAnimation = function () {
        $(".FI-SI-text").hide().removeClass("hide");
        $(".FI-SI-services").mouseenter(function () {
            $(this).css({ "font-size": "13px", "text-align": "center", "height": "55px" });
            $(this).find(".FI-SI-text").css({ "float": "left", "margin-top": "-25px", "clear": "both", "opacity": 0, "width": "100%" }).show();
            $(this).find("i").animate({ "margin-top": "3px" }, 150);
            $(this).find(".FI-SI-text").animate({ "opacity": 1, "margin-top": "-15px" }, 150);

        }).mouseleave(function () {
            $(this).find("i").animate({ "margin-top": "10px" }, 150);
            $(this).find(".FI-SI-text").animate({ "opacity": 0 }, 50);
            $(this).find(".FI-SI-text").css({ "margin-top": "10px" }).hide();
        });
    }
    var buildServicePanel = function () {
        var len = services.length;
        var servicePanelDom = "";
        var pos = "";
        if (config.servicepanel.target == "popup") {
            pos = "position:absolute;overflow:hidden;";
            if (config.servicepanel.position.left && config.servicepanel.position.left != "") {
                if (config.servicepanel.position.left.toLowerCase() == "wall")
                    pos += "left:0px;"
                else
                    pos += "left:" + config.servicepanel.position.left + ";";
                if (config.servicepanel.position.top.toLowerCase() == "wall")
                    pos += "left:0px;"
                else
                    pos += "top:" + config.servicepanel.position.top + ";";
            }
            else if (config.servicepanel.position.right && config.servicepanel.position.right != "") {
                if (config.servicepanel.position.right.toLowerCase() == "wall")
                    pos += "right:0px;"
                else
                    pos += "right:" + config.servicepanel.position.right + ";";
                if (config.servicepanel.position.top.toLowerCase() == "wall")
                    pos += "left:0px;"
                else
                    pos += "top:" + config.servicepanel.position.top + ";";
            }
            else {
                pos += "left:0px;top:" + ($(window).height() / 2) + ";";
            }
        }

        $(".FI-SI-Holder").remove();
        var alignCls = "horiz";
        if (config.servicepanel.alignment.toLowerCase() == "vertical") {
            alignCls = "vert";
            if (config.servicepanel.type == "")
                pos += "width: 63px;"
        }
        var lineCls = "FI-SI-text-nolines";
        if (config.servicepanel.type == "full") {
            alignCls += " FI-SI-horiz-full";
            lineCls = "FI-SI-text-lines";
        }
        var rightSideFlag = 0;
        if ((config.servicepanel.target == "popup") && (config.servicepanel.position.right.toLowerCase() == "wall") && (config.servicepanel.type == "slide")) {
            rightSideFlag = 1;
        }
        servicePanelDom += "<div class=\"FI-SI-Holder\" style=\"" + pos + "\">";
        servicePanelDom += "<div class=\"FI-SI\">";
        servicePanelDom += "    <ul class=\"FI-SI-ul\">";
        for (var i = 0; i < len; i++) {
            servicePanelDom += "        <li class=\"FI-SI-ul-li\" onclick=\"processor_FI.auth('" + services[i].classRef + "','friendsinviter','icon')\">";
            servicePanelDom += "            <div class=\"FI-SI-services FI-SI-shape-circle " + ((rightSideFlag == 1) ? "FI-SI-services-rev" : "") + " FI-SI-" + services[i].classRef + " FI-SI-" + alignCls + "\" >";
            if (rightSideFlag == 0)
                servicePanelDom += "            <i class=\"FI-SI-i-" + services[i].classRef + " FI-SI-i\"></i>";
            if ((config.servicepanel.type != "slide") && (config.servicepanel.type != "full")) {
                servicePanelDom += "            <div class=\"FI-SI-text hide" + ((rightSideFlag == 1) ? " FI-SI-text-rev" : "") + "\">";
                servicePanelDom += "                <div class=\"FI-SI-text-line1\">" + services[i].title + "</div>";
            }
            else {
                servicePanelDom += "            <div class=\"FI-SI-text " + lineCls + ((rightSideFlag == 1) ? " FI-SI-text-rev" : "") + "\">";
                servicePanelDom += "                <div class=\"FI-SI-text-line1\">" + services[i].title + "</div>";
            }

            if ((config.servicepanel.type != "slide") && (config.servicepanel.type != "full"))
                servicePanelDom += "                <div class=\"FI-SI-text-line2 " + lineCls + "\">" + services[i].desc + "</div>";
            else
                servicePanelDom += "                <div class=\"FI-SI-text-line2\">" + services[i].desc + "</div>";
            servicePanelDom += "            </div>";
            if (rightSideFlag == 1)
                servicePanelDom += "            <i class=\"FI-SI-i-" + services[i].classRef + " FI-SI-i\"></i>";
            servicePanelDom += "            </div>";
            servicePanelDom += "        </li>";
        }
        servicePanelDom += "    </ul>";
        servicePanelDom += "</div>";
        servicePanelDom += "</div>";
        return servicePanelDom;
    }
    var init = function () {
        configureServicePanel()
    }
    var getSelectedFriends = function () {
        return processor_FI.getSelectedContacts();
    }
    var getAllFriends = function () {
        return processor_FI.getAllContacts();
    }
    var getService = function () {
        return processor_FI.getService();
    }
    var closefriendsinviter = function () {
        modalSIFI.hide();
    }
    var auth = function (service, product, iconclick) {
        processor_FI.auth(service, product, iconclick)
    }
    return {
        init: init,
        load: setConfig,
        getConfig: getConfig,
        close: closefriendsinviter,
        getSelectedFriends: getSelectedFriends,
        getAllFriends: getAllFriends,
        getService: getService,
        auth: auth
    }
})();

var modalSIFI = (function () {
    var init = function () {
        if ($(".modal-SI-FI-BG").length == 0) {
            $(document).ready(function () {
                var mdl = "<div class=\"modal-SI-FI-BG\"></div>";
                mdl += "<div class=\"modal-SI-FI\"><div class=\"modal-SI-holder\"><div class=\"modal-SI-header\">";
                mdl += "<div class=\"modal-SI-title\"><div class=\"fl\"><img class=\"modal-SI-title-icon\" src=\"\"/></div>";
                mdl += "<div class=\"title-modal-text\"></div></div><div class=\"modal-SI-close\">";
                if (window.location.href.indexOf("oauth") != -1) {
                    mdl += "<img src=\"\"/></div></div>";
                }
                else {
                    mdl += "<img src=\"//socialinviter.com/assets/img/icons/close-small.png\"/></div></div>";
                }
                mdl += "<div class=\"modal-SI-body\"><div class='modal-message-holder'><div class='modal-message'></div></div></div></div></div>";
                if ($("#socialinviter-FI-template").length > 0) {
                    $("#socialinviter-FI-template").append(mdl);
                    $(".modal-SI-FI").css({ "position": "relative", "float": "left" }).find(".modal-SI-close").hide();
                }
                else {
                    $("body").append(mdl);
                    attachModalEvents();
                }

            });
        }
        $(".modal-SI-FI").find(".modal-SI-holder").removeClass("modal-SI-small");
    }
    var attachModalEvents = function () {
        $(".modal-SI-FI").find(".modal-SI-close").unbind("click").click(function () {
            modalSIFI.hide();
        });
        $(document).keyup(function (e) {
            if (e.keyCode == 27) {
                if ($("#socialinviter-FI-template").length == 0)
                    $(".modal-SI-FI").find('.modal-SI-close').click();
            }   // esc
        });
    }
    var show = function () {
        $(document).ready(function () {
            if (friendsinviter.getConfig().servicepanel.showmodal == false || $("#socialinviter-FI-template").length > 0) {
                $(".modal-SI-SC-BG").hide();
                $(".modal-SI-FI-BG").hide();
                $(".modal-SI-CI-BG").hide();
                $(".modal-SI-FI").css({ "z-index": 0 }).find(".modal-SI-close").hide();
            }
            else {
                $(".modal-SI-SC-BG").hide();
                $(".modal-SI-CI-BG").hide();
                $(".modal-SI-FI-BG").fadeIn("slow");
                $(".modal-SI-FI").css({
                    position: "fixed",
                    left: 0
                }).find(".modal-SI-close").show();
            }
            attachModalEvents();
            $(".modal-SI-FI").fadeIn("slow");
            $(".modal-SI-FI").find(".modal-SI-holder").removeClass("modal-SI-small");
        });
    }
    var hide = function () {
        $(".modal-SI-FI-BG").fadeOut("slow");
        $(".modal-SI-FI").fadeOut("slow");
        if (processor_FI.getService() == "facebook") {
            try {
                $("#fb-root").html(" ");
                delete FB;
            }
            catch (e) {
            }
        }
    }
    var load = function (obj, type) {
        //obj = {title:"",body:""}
        if (obj) {
            if (obj.title)
                $(".modal-SI-FI").find(".title-modal-text").html(obj.title);
            if (obj.icon)
                $(".modal-SI-FI").find(".modal-SI-title-icon").attr("src", obj.icon);
            if (obj.body)
                $(".modal-SI-FI").find(".modal-SI-body").html(obj.body).prepend("<div class='modal-message-holder'><div class='modal-message'></div></div>"); ; ;

            $(".modal-SI-FI").find(".modal-SI-holder").removeClass("modal-SI-small");
        }
        if (type == "show")
            show();
    }
    var showErrorMessage = function (errmsg) {
        $(".modal-SI-FI").find(".modal-SI-body").find(".modal-message").addClass("modal-message-error").html(errmsg).fadeIn(500, function () {
            window.setTimeout(function () {
                $(".modal-SI-FI").find(".modal-SI-body").find(".modal-message").html("").fadeOut(500).removeClass("modal-message-error");
            }, 3000);
        });
    }
    var showSuccessMessage = function (succmsg) {
        $(".modal-SI-FI").find(".modal-SI-body").find(".modal-message").addClass("modal-message-success").html(succmsg).fadeIn(500, function () {
            window.setTimeout(function () {
                $(".modal-SI-FI").find(".modal-SI-body").find(".modal-message").html("").fadeOut(500).removeClass("modal-message-success");
            }, 3000);
        });
    }
    return {
        init: init,
        load: load,
        show: show,
        hide: hide,
        showErrorMessage: showErrorMessage,
        showSuccessMessage: showSuccessMessage
    }
})();
thiselectedpdt = "friendsinviter";
var googlewin, poptracker, pollTimer, authLock = 0, fbInit = 0, fbloop = 0, fbroot, psend;
var processor_FI = (function () {
    var endpoint = "//localhost:58572/socialinviter/api/friends.aspx";
    if (window.location.href.toString().indexOf("58572") == -1)
        endpoint = "//socialinviter.com/api/friends.aspx";
    var userendpoint = "//localhost:58572/socialinviter/api/connect.aspx";
    if (window.location.href.toString().indexOf("58572") == -1)
        userendpoint = "//socialinviter.com/api/connect.aspx";
    var uploadendpoint = "//socialinviter.com/API/uploader.aspx";
    var friendsData = {}, selectedfriendsData = {}, selectedMailService = "", popuperror = "", allImportedContacts = "";
    var icons = {
        "twitter": "//socialinviter.com/assets/img/icons/twitter-icon.png",
        "facebook": "//socialinviter.com/assets/img/icons/facebook-icon.png",
        "google": "//socialinviter.com/assets/img/icons/google-icon.png",
        "xing": "//socialinviter.com/assets/img/icons/xing-icon.png"
    };
    var getQueryString = function (name, target) {
        name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
        var regexS = "[\\?&]" + name + "=([^&#]*)";
        var regex = new RegExp(regexS);
        var results = regex.exec(target);
        if (results == null)
            return "";
        else
            return decodeURIComponent(results[1].replace(/\+/g, " "));
    };
    var setPopupError = function (poperr) {
        popuperror = poperr;
    }
    var makecall = function (apiurl) {
        var fileref = document.createElement('script');
        fileref.setAttribute("type", "text/javascript");
        var filerefUrls = apiurl
        fileref.setAttribute("src", decodeMe(apiurl));
        try {
            document.body.appendChild(fileref);
        }
        catch (e) {
            document.getElementsByTagName("head")[0].appendChild(fileref)
        }
    }
    var decodeMe = function (a) {
        a = unescape(a);
        while (a.indexOf("%20") != -1) {
            a = a.replace("%20", "");
        }
        return unescape(a);
    }
    var putInToStore = function (name, value) {
        var c_name = name;
        var exdays = 300;
        var exdate = new Date();
        exdate.setDate(exdate.getDate() + exdays);
        var c_value = escape(value) + ((exdays == null) ? "" : "; expires=" + exdate.toUTCString());
        //document.cookie = c_name + "=" + c_value;
        if (document.domain === 'localhost') {
            document.cookie = c_name + "=" + c_value + ";path=/;";
        } else {
            document.cookie = c_name + "=" + c_value + ';domain=.' + document.domain + ';path=/;';
        }
    }
    var getFromStore = function (name) {
        var c_name = name;
        var i, x, y, ARRcookies = document.cookie.split(";").reverse();
        for (i = 0; i < ARRcookies.length; i++) {
            x = ARRcookies[i].substr(0, ARRcookies[i].indexOf("="));
            y = ARRcookies[i].substr(ARRcookies[i].indexOf("=") + 1);
            x = x.replace(/^\s+|\s+$/g, "");
            if (x == c_name) {
                return unescape(y);
            }
        }
    }
    var removeFromStore = function (name, path, domain) {
        if (path)
            document.cookie = name + "=" + ((path) ? ";path=" + path : "") + ((domain) ? ";domain=" + domain : "") + ";expires=Thu, 01 Jan 1970 00:00:01 GMT";
        else
            document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';

    }
    var displayError = function (msg) {
        msg = decodeURIComponent(msg);
        if (document.getElementById("loadingStatus") != null) {
            document.getElementById("loadingStatus").innerHTML = "<div class='errhldr'><img class='erricn' src='//socialinviter.com/assets/img/icons/alert-icon.png'/><span class='errmsg'>Error:   " + unescape(decodeURIComponent(msg)) + "</span></div>";
        }
        else {
            try { console.log(msg); } catch (e) { };
        }
        $(".modal-SI-FI").find(".modal-SI-holder").addClass("modal-SI-small");
    }
    var closepopup = function (accData) {
        var verificationurl = getFromStore("verificationurl");
        if (verificationurl) {
            clearCache();
            window.location.href = verificationurl
        }
        else {
            window.opener.processor_FI.startgrabbing(accData.data);
            window.self.close();
        }
    }
    var clearCache = function () {
        removeFromStore("service", "/", "." + document.domain);
        removeFromStore("product", "/", "." + document.domain);
        removeFromStore("authData", "/", "." + document.domain);
        removeFromStore("verificationurl", "/", "." + document.domain);
    }
    var authCallback = function (data) {
        putInToStore("authData", decodeURIComponent(decodeURIComponent(data)));
        data = eval("(" + decodeURIComponent(decodeURIComponent(data)) + ")");
        if (data.responseStatus.type == "error") {
            removeFromStore("authData", "/", "." + document.domain);
            displayError(data.responseStatus.message);
            window.opener.processor_FI.setPopupError(data.responseStatus.message);
        }
        else {
            data = data.data;
            if ($.trim(data.authurl) == "")
                displayError("Something went wrong.");
            else
                window.location.href = data.authurl;
        }
    }
    var accessCallback = function (data) {
        var rawData = data;

        data = eval("(" + decodeURIComponent(decodeURIComponent(data)) + ")");
        if (data.responseStatus.type == "error") {
            displayError(data.responseStatus.message);
            window.opener.processor_FI.setPopupError(data.responseStatus.message);
        }
        else {
            putInToStore("authData", rawData);
            closepopup(data);
        }
    }
    var contactsCallback = function (data) {
        var dataStr = data;
        try {
            data = eval("(" + decodeURIComponent(decodeURIComponent(data)) + ")");
        }
        catch (e) {
            data = { responseStatus: { type: "error", message: "Something went wrong, please try again" }, data: { service: processor_FI.getService()} };
        }
        if (data.responseStatus.type == "error") {
            modalSIFI.load({ "title": convertName(data.data.service), "body": "<div class='FI-loading'>" + decodeURIComponent(data.responseStatus.message) + "</div>" }, "show");
            $(".modal-SI-FI").find(".modal-SI-holder").addClass("modal-SI-small");
        }
        else {
            if ($(".grabbedcontactsFI").length == 0) {
                $("body").append("<div class=\"posabs grabbedcontactsFI\"></div>");
                $(".grabbedcontactsFI").attr("contacts", dataStr);
            }
            else {
                $(".grabbedcontactsFI").attr("contacts", dataStr);
            }
            allImportedContacts = "";
            window.setTimeout(function () {
                modalSIFI.load({ "title": convertName(data.data.service), "body": "<div class='FI-loading'>Loading friends...</div>" }, "show");
                window.setTimeout(function () {
                    processor_FI.showStep1(data.data);
                }, 1500);
            }, 1);
        }
    }
    var uploadCallback = function (data) {
        if (data.responseStatus.type == "error") {
            modalSIFI.load({ "title": "", "body": "<div class='FI-loading'>" + data.responseStatus.message + "</div>" }, "show");
            $(".modal-SI-FI").find(".modal-SI-holder").addClass("modal-SI-small");
        }
        else {
            $(".upload-SI-loading").hide();
            startgrabbing({ token: "", tokensecret: "", tokenverifier: "", userid: "", uploadedfile: data.data.uploadedFileUrl });
        }
    }
    var submitUploading = function () {
        $(".upload-SI-loading").show();
        if (document.getElementById("fupload").value == "") {
            $(".upload-SI-loading").hide();
            $(".upload-SI-error-panel").find(".model-err-msg").html("Please select file.");
            $(".upload-SI-error-panel").show();
            document.getElementById("fupload").value = "";
            $("#fupload").focus();
            return false;
        }
        else {
            var flag = 0;
            if ((document.getElementById("fupload").value.lastIndexOf(".csv") != -1) || (document.getElementById("fupload").value.lastIndexOf(".CSV") != -1))
                flag = 1;

            if (flag == 0) {
                $(".upload-SI-loading").hide();
                $(".upload-SI-error-panel").find(".model-err-msg").html("Please upload a file of type *.CSV");
                $(".upload-SI-error-panel").show();
                document.getElementById("fupload").value = "";
                $("#fupload").focus();
                return false;
            }
            else {
                document.getElementById("pluginloc").value = window.location.href;
                $(".upload-SI-error-panel").find(".model-err-msg").html("");
                $(".upload-SI-error-panel").hide();
                return true;
            }
        }
    }
    var getInputData = function (data) {
        var urlValue = "";
        var pageUrl = window.location.href;
        if ((data.service == "twitter") || (data.service == "skyrock") || (data.service == "xing")) {
            urlValue = "&token=" + getQueryString("oauth_token", pageUrl) + "&tokenverifier=" + getQueryString("oauth_verifier", pageUrl) + "&tokensecret=" + data.tokensecret;
        }
        else {
            urlValue = "&token=" + getQueryString("code", pageUrl) + "&tokensecret=" + data.tokensecret + "&tokenverifier=";
        }
        return urlValue;
    }

    var startgrabbing = function (authData) {
        processor_FI.processLock("release");
        var srcUrl = document.getElementById("apifiscript").src;
        var id = getQueryString("id", srcUrl);
        var key = getQueryString("key", srcUrl);
        var did = getQueryString("did", srcUrl);
        if (id == "" && did == "") {
            var data = getFromStore("userIdentityFI");
            data = eval("(" + decodeURIComponent(decodeURIComponent(data)) + ")");
            data = data.data;
            id = data.userid;
            did = data.domid;
        }
        var serv = processor_FI.getFromStore("service");
        if (authData) {
            modalSIFI.load({ "title": convertName(serv), "body": "<div class='FI-loading'>Fetching friends...</div>" }, "show");
            var reqParam = "&token=" + authData.token + "&tokensecret=" + authData.tokensecret + "&tokenverifier=" + authData.tokenverifier + "&userid=" + authData.userid;
            reqParam += "&type=grabfriends";
            makecall(endpoint + "?id=" + id + "&did=" + did + "&product=" + getFromStore("product") + "&key=" + key + "&service=" + serv + "&callback=processor_FI.contactsCallback" + reqParam);
        }
        else {
            modalSIFI.showErrorMessage("Invalid request: something went wrong.");
        }
    }
    var messageCallback = function (data) {
        var dataStr = data;
        $(".modal-SI-FI").find(".proceed-send").removeClass("steptwodisable");
        try {
            data = eval("(" + decodeURIComponent(decodeURIComponent(data)) + ")");
            if (friendsinviter.getConfig().callbacks) {
                if (friendsinviter.getConfig().callbacks.send) {
                    friendsinviter.getConfig().callbacks.send(psend, convertName(processor_FI.getService()), selectedfriendsData.friends, data);
                }
            }
        }
        catch (e) {
            data = { responseStatus: { type: "error", message: "Something went wrong, please try again" }, data: { service: processor_FI.getService()} };
        }
        $(".fisendloading").hide();
    }
    var sendMessage = function () {
        $(".fisendloading").show();
        var srcUrl = document.getElementById("apifiscript").src;
        var id = getQueryString("id", srcUrl);
        var key = getQueryString("key", srcUrl);
        var did = getQueryString("did", srcUrl);
        if (id == "" && did == "") {
            var data = getFromStore("userIdentityFI");
            data = eval("(" + decodeURIComponent(decodeURIComponent(data)) + ")");
            data = data.data;
            id = data.userid;
            did = data.domid;
        }
        var authData = processor_FI.getFromStore("authData");
        authData = eval("(" + decodeURIComponent(decodeURIComponent(authData)) + ")").data;
        var serv = processor_FI.getFromStore("service");
        var friends = processor_FI.getSelectedContacts().friends;
        var len = friends.length;
        var friendsids = [];
        for (var i = 0; i < len; i++) {
            friendsids.push(friends[i].id);
        }
        var reqParam = "&token=" + authData.token + "&tokensecret=" + authData.tokensecret + "&tokenverifier=" + authData.tokenverifier + "&userid=" + authData.userid;
        reqParam += "&message=" + $(".mailing-message").val() + "&subject=" + $(".mailing-subject").val() + "&friendsids=" + friendsids.join(",");
        makecall(endpoint + "?id=" + id + "&did=" + did + "&product=" + getFromStore("product") + "&key=" + key + "&service=" + serv + "&callback=processor_FI.messageCallback" + reqParam);

    }
    var updateUser = function (data) {
        putInToStore("userIdentityFI", decodeURIComponent(decodeURIComponent(data)));
        data = eval("(" + decodeURIComponent(decodeURIComponent(data)) + ")");
        if (data.responseStatus.type == "error") {
            removeFromStore("userIdentityFI", "/", "." + document.domain);
            invalidkey = data.responseStatus.message;
            displayError(data.responseStatus.message);
        }
        else {
            invalidkey = "";
            data = data.data;
            putInToStore("key", data.licensekey);
            putInToStore("id", data.userid);
            putInToStore("domid", data.domid);
            putInToStore("fbAPIkey", data.fbkey);
            init();
        }
    }

    var FBCallback = function (data) {
        data = eval("(" + decodeURIComponent(decodeURIComponent(data)) + ")");
        if (data.responseStatus.type != "error") {
            putInToStore("fbAPIkey", data.data.fbkey);
            processor_FI.auth('facebook', 'friendsinviter');
        }
    }
    var reFetchFBkey = function () {
        removeFromStore("service", "/", "." + document.domain);
        removeFromStore("product", "/", "." + document.domain);
        removeFromStore("key", "/", "." + document.domain);
        removeFromStore("id", "/", "." + document.domain);
        removeFromStore("domid", "/", "." + document.domain);
        removeFromStore("fbAPIkey", "/", "." + document.domain);
        removeFromStore("userIdentityFI", "/", "." + document.domain);
        var srcUrl = document.getElementById("apifiscript").src;
        var key = getQueryString("key", srcUrl);
        makecall(userendpoint + "?key=" + key + "&callback=processor_FI.FBCallback");
    }

    var initialize = function () {
        if ((getQueryString("key", window.location.href) == "") && (getQueryString("uploadedstatus", window.location.href) == "") && (getQueryString("domid", window.location.href) == "") && (window.location.href.indexOf("/oauth.html") == -1)) {
            removeFromStore("service", "/", "." + document.domain);
            removeFromStore("product", "/", "." + document.domain);
            removeFromStore("key", "/", "." + document.domain);
            removeFromStore("id", "/", "." + document.domain);
            removeFromStore("domid", "/", "." + document.domain);
            removeFromStore("fbAPIkey", "/", "." + document.domain);
            removeFromStore("userIdentityFI", "/", "." + document.domain);
            var srcUrl = document.getElementById("apifiscript").src;
            var key = getQueryString("key", srcUrl);
            makecall(userendpoint + "?key=" + key + "&callback=processor_FI.updateUser");
        }
        else {
            init();
        }

    }
    var init = function () {
        var service = getQueryString("service", window.location.href);
        var product = getQueryString("product", window.location.href);
        if (document.getElementById("apifiscript")) {
            var srcUrl = document.getElementById("apifiscript").src;
            var id = getQueryString("id", srcUrl);
            var key = getQueryString("key", srcUrl);
            var did = getQueryString("did", srcUrl);
            if (id == "" && did == "") {
                var data = getFromStore("userIdentityFI");
                data = eval("(" + decodeURIComponent(decodeURIComponent(data)) + ")");
                data = data.data;
                id = data.userid;
                did = data.domid;
            }
            if (product != "" && service != "") {
                //authentication
                document.getElementById("loadingtext").innerHTML = "Authenticating";
                clearCache();
                var verificationurl = getQueryString("verification", window.location.href);
                if (verificationurl != "") {
                    putInToStore("verificationurl", verificationurl);
                }
                else {
                    removeFromStore("verificationurl", "/", "." + document.domain);
                }
                if (service) {
                    putInToStore("service", service);
                    putInToStore("product", product);
                    putInToStore("key", key);
                    putInToStore("id", id);
                    putInToStore("domid", did);
                    makecall(endpoint + "?id=" + id + "&did=" + did + "&key=" + key + "&product=" + product + "&service=" + service + "&callback=processor_FI.authCallback");
                }
            }
            else if ((getQueryString("oauth_token", window.location.href) != "") || getQueryString("code", window.location.href)) {
                //accesstoken
                document.getElementById("loadingtext").innerHTML = "Verifying credentials";
                var authData = processor_FI.getFromStore("authData");
                if (authData) {
                    authData = eval("(" + authData + ")").data;
                    var constructedData = getInputData(authData);
                    var getAccessUrl = endpoint + "?id=" + id + "&did=" + did + "&key=" + key + "&service=" + authData.service + "&product=" + getFromStore("product");
                    getAccessUrl += constructedData + "&callback=processor_FI.accessCallback";
                    makecall(getAccessUrl);
                }
                else {
                    displayError(escape("Invalid request"));
                }
            }
            else if (getQueryString("uploadedstatus", window.location.href) != "") {
                var uploadedstatus = getQueryString("uploadedstatus", window.location.href);
                if (uploadedstatus != "") {
                    var uploadedObj = eval("(" + uploadedstatus + ")");
                    parent.processor_FI.uploadCallback(uploadedObj);

                }
            }
            else if (getQueryString("error", window.location.href) == "access_denied" || getQueryString("denied", window.location.href) != "") {
                try {

                    window.opener.processor_FI.setPopupError("Permission denied");
                }
                catch (e) {
                }
                window.self.close();
            }
            else {
                if (window.location.href.indexOf("/oauth.html") != -1) {
                    displayError("Invalid request, some parameters are missing.");
                }
            }
        }
        else if (getQueryString("uploadedstatus", window.location.href) != "") {
            var uploadedstatus = getQueryString("uploadedstatus", window.location.href);
            if (uploadedstatus != "") {
                var uploadedObj = eval("(" + uploadedstatus + ")");
                parent.processor_FI.uploadCallback(uploadedObj);
            }
        }
    }
    var processLock = function (lck) {
        if (lck == "release")
            authLock = 0;
        else
            authLock = 1;
        return authLock;
    }
    var scrollToWindow = function () {
        if ($("#socialinviter-FI-template").length > 0) {
            $('body,html').animate({
                scrollTop: $("#socialinviter-FI-template").offset().top - 20
            }, 600);
        }
    }
    var auth = function (service, product, iconclick) {
        thiselectedpdt = "friendsinviter";
        popuperror = "";
        if (iconclick)
            friendsData = {};
        selectedMailService = service;
        putInToStore("product", product);
        putInToStore("service", service);
        processor_FI.processLock("lock");
        try { window.clearInterval(googlewin); } catch (e) { }
        try { window.clearInterval(pollTimer); } catch (e) { }
        if (invalidkey != "") {
            var errorStatDom = "<div class=\"error-stat\"><div class=\"model-err-msg\">" + decodeURIComponent(invalidkey) + "</div></div>";
            modalSIFI.load({ "title": convertName(service), "icon": icons[service], "body": "<div class='FI-loading'>Authentication failed, please <a href=\"javascript:;\" onclick=\"processor_FI.reFetchFBkey();\">Try again.</a>" + errorStatDom + "</div>" }, "show");
            $(".modal-SI-FI").find(".modal-SI-holder").addClass("modal-SI-small");
            return true;
        }
        if (service == "facebook") {
            var FBAPIkey = processor_FI.getFromStore("fbAPIkey");
            if (FBAPIkey && FBAPIkey != "" && FBAPIkey != "undefined") {
                $("#fb-root").html(" ");
                FB = undefined;
                modalSIFI.load({ "title": convertName(service), "icon": icons[service], "body": "<div class=\"fbHolder hide\"><div id=\"fb-root\"></div></div><div class='FI-loading'>Please authenticate your " + convertName(service) + " account, make sure the authenticating window is not blocked by popup blocker.</div>" }, "show");
                fbinitilize(processor_FI.getFromStore("fbAPIkey"));
            }
            else {
                var errorStatDom = "<div class=\"error-stat\"><div class=\"model-err-msg\">Facebook API key is missing, please fix it</div></div>";
                modalSIFI.load({ "title": convertName(processor_FI.getService()), "icon": icons[service], "body": "<div class='FI-loading'>Authentication failed, please <a href=\"javascript:;\" onclick=\"processor_FI.reFetchFBkey();\">Try again.</a>" + errorStatDom + "</div>" }, "show");
            }
            $(".modal-SI-FI").find(".modal-SI-holder").addClass("modal-SI-small");
            scrollToWindow();
        }
        else {
            modalSIFI.load({ "title": "Authenticating...", "icon": icons[service], "body": "<div class='FI-loading'>Please authenticate your " + convertName(service) + " account, make sure the authenticating window is not blocked by popup blocker.</div>" }, "show");
            $(".modal-SI-FI").find(".modal-SI-holder").addClass("modal-SI-small");
            scrollToWindow();
            var srcUrl = document.getElementById("apifiscript").src;
            var id = getQueryString("id", srcUrl);
            var key = getQueryString("key", srcUrl);
            var did = getQueryString("did", srcUrl);
            if (id == "" && did == "") {
                var data = getFromStore("userIdentityFI");
                data = eval("(" + decodeURIComponent(decodeURIComponent(data)) + ")");
                data = data.data;
                id = data.userid;
                did = data.domid;
            }
            putInToStore("csspath", friendsinviter.getConfig().servicepanel.path.css);
            putInToStore("jspath", friendsinviter.getConfig().servicepanel.path.js);
            poptracker = window.open("oauth.html?key=" + key + "&id=" + id + "&did=" + did + "&service=" + service + "&product=" + product, "", "width=700, height=600");
            window.clearInterval(pollTimer);
            pollTimer = window.setInterval(function () {
                if (poptracker == undefined) {
                    window.clearInterval(pollTimer);
                    modalSI.load({ "title": convertName(processor_FI.getService()), "body": "<div class='FI-loading'>Please make sure you browser doesn't block our authentication popup window. Operation failed, please <a href=\"javascript:;\" onclick=\"processor_FI.auth('" + processor_FI.getService() + "','friendsinviter','true')\">Try again.</a></div>" }, "show", "fast");
                    $(".modal-SI-FI").find(".modal-SI-holder").addClass("modal-SI-small");
                }
                else if (poptracker.closed !== false) { // !== is required for compatibility with Opera
                    window.clearInterval(pollTimer);
                    if (authLock == 1) {
                        var errorStatDom = "";
                        if (popuperror != "")
                            errorStatDom = "<div class=\"error-stat\"><div class=\"model-err-msg\">" + decodeURIComponent(popuperror) + "</div></div>";
                        modalSIFI.load({ "title": convertName(processor_FI.getService()), "body": "<div class='FI-loading'>Authentication failed, please <a href=\"javascript:;\" onclick=\"processor_FI.auth('" + processor_FI.getService() + "','friendsinviter')\">Try again.</a>" + errorStatDom + "</div>" }, "show");
                        processor_FI.processLock("release");
                        $(".modal-SI-FI").find(".modal-SI-holder").addClass("modal-SI-small");
                    }
                }
            }, 200);
        }

    }
    var getService = function () {
        return selectedMailService;
    }
    var convertName = function (name) {
        if (name != "" && name != undefined) {
            var fLetter = name.substr(0, 1).toUpperCase();
            var name_ = name.substr(1, name.length - 1);
            name = fLetter + name_;
        }
        return name;
    }
    var getAllContacts = function () {
        var evalData = "";
        if (allImportedContacts == "") {
            allImportedContacts = eval("(" + decodeURIComponent(decodeURIComponent($(".grabbedcontactsFI").attr("contacts"))) + ")").data;
            $(".grabbedcontactsFI").attr("contacts", "");
        }
        return allImportedContacts;
    }
    var getSelectedContacts = function () {
        var len = selectedfriendsData.friends.length;
        var SelCont = [];
        for (var i = 0; i < len; i++) {
            if (selectedfriendsData.friends[i])
                SelCont.push(selectedfriendsData.friends[i]);
        }
        return { "friends": SelCont };
    }
    var selectContact = function (index) {
        selectedfriendsData.friends[index] = (processor_FI.getAllContacts().friends[index]);
        if (processor_FI.getSelectedContacts().friends.length == 0) {
            $(".step1-proceed").addClass("steptwodisable");
        }
        else {
            $(".step1-proceed").removeClass("steptwodisable");
        }
    }
    var deSelectContact = function (index) {
        //selectedfriendsData.friends.splice(parseInt(index), 1);
        selectedfriendsData.friends[index] = undefined;
        if (processor_FI.getSelectedContacts().friends.length == 0) {
            $(".step1-proceed").addClass("steptwodisable");
        }
        else {
            $(".step1-proceed").removeClass("steptwodisable");
        }
    }
    var selectAllContacts = function () {
        $(".selectcontact").prop("checked", true);
        selectedfriendsData.friends = friendsData.friends;
        $(".step1-proceed").removeClass("steptwodisable");
        $(".FI-Contact-count").html(processor_FI.getSelectedContacts().friends.length + " Selected");
    }
    var deSelectAllContacts = function () {
        selectedfriendsData = { "friends": [], "service": selectedfriendsData.service };
        $(".selectcontact").prop("checked", false);
        $(".step1-proceed").addClass("steptwodisable");
        $(".FI-Contact-count").html(processor_FI.getSelectedContacts().friends.length + " Selected");
    }
    var setData = function (data) {
        selectedfriendsData = data;
    }
    var showcsvupload = function () {
        var tgturl = "//socialinviter.com/";
        var csvStr = "<div class=\"file-SI-upload\"><div class=\"file-SI-upload-left fl\">";
        csvStr += "<div><iframe src=\"\" id=\"fuploadframe\" name=\"fuploadframe\" height=\"0px\" width=\"0px\" frameborder=\"0\" scrolling=\"no\"></iframe></div>";
        csvStr += "<form action=\"" + uploadendpoint + "\" id=\"fuploadform\" method=\"post\" target=\"fuploadframe\" onsubmit=\"javascript:return processor_FI.submitUploading()\" enctype=\"multipart/form-data\">";
        csvStr += "<div><div><div class=\"fl\"><label for=\"fupload\" class=\"upload-SI-label\">Please select a CSV file</label></div>";
        csvStr += "<div class=\"upload-SI-control\"><input type=\"file\" name=\"fupload\" id=\"fupload\"/><input type=\"hidden\" id=\"pluginloc\" name=\"pluginloc\" /></div></div>";
        csvStr += "<div class=\"upload-SI-button-holder fl\"><button type=\"submit\" class=\"upload-SI-button\">Upload</button></div>";
        csvStr += "<div class=\"upload-SI-loading\"><img src=\"" + tgturl + "assets/img/icons/processing.gif\" /></div></div></form></div>";
        csvStr += "<div class=\"dile-SI-upload-right fr\"><div class=\"supp-SI-lbl\">Supported CSV files from: </div><div>";
        csvStr += "<ul class=\"supp-SI-list\"><li><img src=\"" + tgturl + "assets/img/icons/outlook-icon.png\" /></li><li><img src=\"" + tgturl + "assets/img/icons/thunderbird-icon.png\" /></li>";
        csvStr += "<li><img src=\"" + tgturl + "assets/img/icons/gmail-icon.png\" /></li><li><img src=\"" + tgturl + "assets/img/icons/yahoo-icon.png\" /></li>";
        csvStr += "<li><img src=\"" + tgturl + "assets/img/icons/hotmail-icon.png\" /></li><li><img src=\"" + tgturl + "assets/img/icons/linkedin-icon.png\" /></li><li><img src=\"" + tgturl + "assets/img/icons/google-icon.png\" /></li>";
        csvStr += "<li><img src=\"" + tgturl + "assets/img/icons/xing-icon.png\" /></li></ul></div></div><div class=\"break upload-SI-error-panel\">";
        csvStr += "<div class=\"error-stat\"><div class=\"model-err-msg\"></div></div>";
        csvStr += "</div></div>";
        if (friendsData.friends) {
            csvStr += "<div class=\"FI-list-container-footer FI-footer-back-list\">";
            csvStr += "<div class=\"FI-contact-refresh-holder\">";
            csvStr += "<a href=\"javascript:;\" class=\"FI-contact-refresh backtolist-FI\">Back to list</a>";
            csvStr += "</div></div>";
        }
        $(".modal-SI-FI").find(".modal-SI-body").html(csvStr).prepend("<div class='modal-message-holder'><div class='modal-message'></div></div>");
        $("#fupload").change(function () {
            $(".upload-SI-button").focus();
        });
        $(".backtolist-FI").unbind("click").click(function () {
            $(".modal-SI-FI").find(".modal-SI-holder").removeClass("modal-SI-small");
            processor_FI.showStep1();
        });
    }
    var showStep1 = function (contactsData) {
        if (contactsData) {
            friendsData = contactsData;
            setData(friendsData);
        }
        else {
            contactsData = friendsData;
        }
        var len = contactsData.friends.length;
        var contactsDom = "<div class=\"FI-list-container step1\" style=\"opacity:0\">";
        contactsDom += "<div class=\"FI-list-container-header\">";
        var stp1title = friendsinviter.getConfig().servicepanel.content.step1.title;
        contactsDom += "<div class=\"FI-list-container-header-title\">" + stp1title.replace("{0}", convertName(contactsData.service)) + "</div>";
        var stpnavig = friendsinviter.getConfig().servicepanel.content.navigation.replace("{0}", "1");
        contactsDom += "<div class=\"fr FI-list-header-step\">" + stpnavig.replace("{1}", "2") + "</div>";
        contactsDom += "</div>";
        contactsDom += "<div class=\"FI-list-container-status\">";
        var stp1desc = friendsinviter.getConfig().servicepanel.content.step1.description;
        contactsDom += stp1desc.replace("{0}", len);
        contactsDom += "</div>";
        contactsDom += "<div class=\"FI-contact-Panel " + ((len == 0) ? "hide" : "") + "\">";
        contactsDom += "<div class=\"FI-contact-Panel-header\">";
        contactsDom += "<div class=\"fl FI-contact-selectall\">";
        contactsDom += "<div class=\"FI-chkselall\">";
        contactsDom += "<input type=\"checkbox\" id=\"chkselall\" checked=\"checked\"></div>";
        contactsDom += "<div class=\"FI-chkselall-label\">";
        var stp1selectall = friendsinviter.getConfig().servicepanel.content.step1.selectall;
        contactsDom += "<label for=\"chkselall\">" + stp1selectall + "</label>";
        contactsDom += "</div></div>";
        contactsDom += "<div class=\"fr FI-Contact-count\">";
        contactsDom += len + " Selected";
        contactsDom += "</div>";
        if (friendsinviter.getConfig().servicepanel.showsearch != false)
            contactsDom += "<div class=\"fr FI-Contact-search\"><input id=\"txtsearchname\" type=\"text\" value=\"Search...\"></div>";
        contactsDom += "</div>";
        contactsDom += "<div class=\"FI-contact-Panel-body\">";
        contactsDom += "<ul class=\"FI-contact-ul-list\">";
        for (var i = 0; i < len; i++) {
            contactsDom += "<li class=\"FI-contact-ul-li-list FI-contacts-def\" contactindex=\"" + i + "\"><div class=\"fl FI-li-holdr\">";
            contactsDom += "<div class=\"FI-contact-selectbox\">";
            contactsDom += "<input type=\"checkbox\" checked=\"checked\" class=\"selectcontact hand\">";
            contactsDom += "</div>";
            contactsDom += "<div class=\"fl FI-contact-photo-holder\">";
            //contactsDom += "<img class=\"FI-contact-photo\" src=\"" + ((contactsData.friends[i].imageurl == "") ? "//socialinviter.com/assets/img/sicon/nopic_m.jpg" : contactsData.friends[i].imageurl) + "\" style=\"border-radius:500px\">";
            contactsDom += "<img class=\"FI-contact-photo\" src=\"//socialinviter.com/assets/img/sicon/nopic_m.jpg\" originalsrc=\"" + ((contactsData.friends[i].imageurl == "") ? "//socialinviter.com/assets/img/sicon/nopic_m.jpg" : contactsData.friends[i].imageurl) + "\" style=\"border-radius:500px\">";
            contactsDom += "<div class=\"more-holder hide\"><div class=\"FI-contact-more hide\">";
            contactsDom += "<img src=\"//socialinviter.com/assets/img/icons/moredetails.png\"/>";
            contactsDom += "<div class=\"FI-contact-more-details\">loading...</div></div></div>";
            contactsDom += "</div>";
            contactsDom += "<div class=\"FI-contact-namesection\">";
            contactsDom += "<div class=\"FI-contactPanel-title b\""
            var nme = "";
            try {
                nme = (decodeURIComponent(contactsData.friends[i].name.first_name) == "null") ? "" : decodeURIComponent(contactsData.friends[i].name.first_name);
                nme += " ";
                nme += (decodeURIComponent(contactsData.friends[i].name.last_name) == "null") ? "" : decodeURIComponent(contactsData.friends[i].name.last_name);
            }
            catch (e) {
                nme = (unescape(contactsData.friends[i].name.first_name) == "null") ? "" : unescape(contactsData.friends[i].name.first_name);
                nme += " ";
                nme += (unescape(contactsData.friends[i].name.last_name) == "null") ? "" : unescape(contactsData.friends[i].name.last_name);
            }
            contactsDom += " title=\"" + nme.trim() + "\">" + nme.trim() + "</div>";
            contactsDom += "<div class=\"FI-contactPanel-email\" title=\"" + decodeURIComponent(contactsData.friends[i].location) + "\">" + decodeURIComponent(contactsData.friends[i].location) + "</div>";
            contactsDom += "</div></div>";
            contactsDom += "</li>";
        }
        contactsDom += "</ul>";
        contactsDom += "</div></div>";
        contactsDom += "<div class=\"FI-list-container-footer\">";
        contactsDom += "<div class=\"FI-contact-refresh-holder\">";
        var stp1refresh = friendsinviter.getConfig().servicepanel.content.step1.button.refresh;
        var stp1back = "back";
        contactsDom += "<a href=\"javascript:;\" onclick=\"processor_FI.auth('" + contactsData.service + "','friendsinviter')\" class=\"FI-contact-refresh\">" + ((contactsData.service == "outlook") ? stp1back : stp1refresh) + "</a>";
        contactsDom += "</div>";
        var stp1proceed = friendsinviter.getConfig().servicepanel.content.step1.button.proceed;
        contactsDom += "<div class=\"FI-list-container-proceed step1-proceed " + ((len == 0) ? "hide" : "") + "\">" + stp1proceed + "</div>";
        contactsDom += "</div></div>";

        $(".modal-SI-FI").find(".modal-SI-body").html(contactsDom).prepend("<div class='modal-message-holder'><div class='modal-message'></div></div>"); ;
        if (contactsData.service == "google") {
            gmailImageProcessor();
        }
        if (friendsinviter.getConfig().servicepanel.showsearch != false) {
            $("#txtsearchname").off("click").on("click", function () {
                var me = $(this);
                if ($.trim(me.val()) == "Search...") {
                    me.val("");
                }
                else if (me.val().length > 1) {
                    processor_FI.autoSuggest(me.val());
                }
            }).off("blur").on("blur", function () {
                var me = $(this);
                if ($.trim(me.val()) == "") {
                    me.val("Search...");
                }
                window.setTimeout(function () {
                    $("#autosuggestholder").hide();
                }, 500);
            }).off("keyup").on("keyup", function () {
                var me = $(this);
                if (me.val().length > 1) {
                    if (me.val().indexOf("Search...") != -1)
                        me.val(me.val().replace("Search...", ""));
                    processor_FI.autoSuggest(me.val());
                }

            });
        }
        $(".step1").animate({
            opacity: 1.0
        })
        $(".step1-proceed").unbind("click").click(function (event) {
            if ($(this).hasClass("steptwodisable")) {
                modalSIFI.showErrorMessage("Please select a friend to proceed");
            }
            else {
                processor_FI.showStep2();
                if (friendsinviter.getConfig().callbacks) {
                    if (friendsinviter.getConfig().callbacks.proceed) {
                        friendsinviter.getConfig().callbacks.proceed(event, convertName(processor_FI.getService()));
                    }
                }
                $(".proceed-send").removeClass("steptwodisable");
            }
        });
        $("#chkselall").unbind("change").change(function () {
            if ($(this).prop("checked") == true) {
                processor_FI.selectAllContacts()
            }
            else {
                processor_FI.deSelectAllContacts();
            }
        });
        $(".FI-contact-more").unbind("click").click(function () {
            var me = $(this);
            me.find("img").hide();
            me.find(".more-text").hide();
            var liObj = me.closest(".FI-contact-ul-li-list");
            liObj.removeClass("FI-contacts-def").addClass("FI-contacts-moredet");
            liObj.find(".FI-li-holdr").addClass("FI-li-moredet");
            $(this).closest(".FI-contact-ul-li-list").unbind("mouseenter").unbind("mouseleave").mouseenter(function () {
                var thisObj = $(this).find(".FI-contact-more-details");
                var tgt = thisObj.parent();
                if (thisObj.is(":visible"))
                    tgt.find("img").hide();
                else
                    tgt.find("img").show();
                tgt.find(".more-text").hide();
                if (thisObj.find(".details-FI-panel").length == 0) {
                    var index = tgt.closest(".FI-contact-ul-li-list").attr("contactindex");
                    var data = (processor_FI.getAllContacts().friends[index]);
                    processor_FI.loadContactDetails(thisObj, data);
                }
                else
                    thisObj.find(".details-FI-panel").show();

            }).mouseleave(function () {
                var meObj = $(this).find(".FI-contact-more-details");
                meObj.parent().find("img").css({ "margin-left": "0px" }).show();
                meObj.hide();
                var liObj = $(this);
                liObj.removeClass("FI-contacts-moredet").addClass("FI-contacts-def");
                liObj.find(".FI-li-holdr").removeClass("FI-li-moredet");
            }).find(".FI-contact-more-details").show().css({ "border": "2px solid #C5CCDF", "border-top": "none" });
            var tgt = me.parent();
            if (tgt.find(".details-FI-panel").length == 0) {
                var index = tgt.closest(".FI-contact-ul-li-list").attr("contactindex");
                var data = (processor_FI.getAllContacts().friends[index]);
                processor_FI.loadContactDetails(tgt.find(".FI-contact-more-details"), data);
            }
            var bdyObj = $(".FI-contact-Panel-body");
            var sTop = bdyObj.scrollTop() + me.closest(".FI-contact-ul-li-list").position().top - bdyObj.height() + 26;
            bdyObj.animate({
                scrollTop: sTop
            });
        }).mouseenter(function () {
            // $(this).find("img").show();
            var thisObj = $(this);
            var tgt = thisObj.parent();
            if (thisObj.find(".details-FI-panel").length == 0) {
                var index = tgt.closest(".FI-contact-ul-li-list").attr("contactindex");
                var data = (processor_FI.getAllContacts().friends[index]);
                processor_FI.loadContactDetails(thisObj.find(".details-FI-panel"), data);
                //thisObj.find(".details-FI-panel").hide();
            }
        })
        $(".selectcontact").unbind("change").change(function () {
            if ($(this).prop("checked") == true) {
                processor_FI.selectContact($(this).closest("li").attr("contactindex"));
                if ($(".FI-Contact-count").length > 0)
                    $(".FI-Contact-count").html(processor_FI.getSelectedContacts().friends.length + " Selected");
                if (processor_FI.getAllContacts().friends.length == processor_FI.getSelectedContacts().friends.length)
                    $("#chkselall").prop("checked", true);
                else
                    $("#chkselall").prop("checked", false);
            }
            else {
                processor_FI.deSelectContact($(this).closest("li").attr("contactindex"));
                if ($(".FI-Contact-count").length > 0)
                    $(".FI-Contact-count").html(processor_FI.getSelectedContacts().friends.length + " Selected");
                $("#chkselall").prop("checked", false);
            }
        });
        resizeStep1();
        if (friendsinviter.getConfig().callbacks) {
            if (friendsinviter.getConfig().callbacks.loaded) {
                friendsinviter.getConfig().callbacks.loaded(convertName(contactsData.service), contactsData.friends);
            }
        }
    }
    var autoSuggest = function (val) {
        var list = processor_FI.getAllContacts().friends;
        var len = list.length;
        var pattern = new RegExp(val, "gi");
        var matchedArr = [];
        for (var i = 0; i < len; i++) {
            var name = "";
            if ((list[i].name.first_name != null) && (list[i].name.last_name != null)) {
                try {
                    name = decodeURIComponent(list[i].name.first_name + " " + list[i].name.last_name);
                }
                catch (e) { name = unescape(list[i].name.first_name + " " + list[i].name.last_name); }
                if (name.match(pattern)) {
                    matchedArr.push({ index: i, name: name, nameDetails: { first_name: list[i].name.first_name, last_name: list[i].name.last_name} });
                }

            }
            else if ((list[i].name.first_name != null) && (list[i].name.last_name == null)) {
                try { name = decodeURIComponent(list[i].name.first_name); } catch (e) { name = unescape(list[i].name.first_name); }
                if (name.match(pattern)) {
                    matchedArr.push({ index: i, name: name, nameDetails: { first_name: list[i].name.first_name, last_name: list[i].name.last_name} });
                }
            }
            else if ((list[i].name.first_name == null) && (list[i].name.last_name != null)) {
                try { name = decodeURIComponent(list[i].name.last_name); } catch (e) { name = unescape(list[i].name.last_name); }
                if (name.match(pattern)) {
                    matchedArr.push({ index: i, name: name, nameDetails: { first_name: list[i].name.first_name, last_name: list[i].name.last_name} });
                }
            }
        }
        $("#autosuggestholder").remove();
        var matchlen = matchedArr.length;
        if (matchlen > 0) {
            var suggestDom = "<div id=\"autosuggestholder\"><ul id=\"autosuggestname\">";
            for (var i = 0; i < matchlen; i++) {
                suggestDom += "<li index=\"" + matchedArr[i].index + "\">" + decodeURIComponent(matchedArr[i].name) + "</li>"
            }
            suggestDom += "</ul></div>";
            $("#txtsearchname").closest("div").append(suggestDom);
            $("#autosuggestname").find("li").off("click").on("click", function () {
                var me = $(this);
                $("#txtsearchname").val(me.text());
                $(".highlightmyselect").removeClass("highlightmyselect");
                var pickedCont = $(".FI-contact-ul-li-list[contactindex='" + me.attr("index") + "']");
                pickedCont.addClass("highlightmyselect");
                $("#autosuggestholder").hide();
                var bdyObj = $(".FI-contact-Panel-body");
                var sTop = bdyObj.scrollTop() + pickedCont.position().top - bdyObj.height() + 26;
                bdyObj.animate({
                    scrollTop: sTop
                });
            });
        }
        else {
            if ($("#autosuggestholder").length == 0) {
                $("#txtsearchname").closest("div").append("<div id=\"autosuggestholder\" class=\"autosuggest-nores\">No result found.</div>");
            }
        }
        return matchedArr;
    }
    var resizeStep1 = function () {
        if ($(".FI-list-container-header").is(":visible") == true) {
            $(".modal-SI-FI").find(".modal-SI-holder").height($(".step1").height() + 85);
        }
        else {
            $(".modal-SI-FI").find(".modal-SI-holder").height($(".step1").height() + 65);
        }
        var contLen = processor_FI.getSelectedContacts().friends.length;
        if (contLen == 0)
            $(".step1-proceed").addClass("steptwodisable");
        else
            $(".step1-proceed").removeClass("steptwodisable");
    }
    var fbinitilize = function (appid) {
        window.fbAsyncInit = function () {
            FB.init({
                appId: appid,
                status: true,
                cookie: true,
                xfbml: true,
                "viewMode": "website"
            });
        };
        (function () {
            var ef = document.createElement('script'); ef.async = true;
            ef.src = document.location.protocol + '//connect.facebook.net/en_US/all.js';
            document.getElementById('fb-root').appendChild(ef);
        } ());
        window.setTimeout(function () {
            loginfbuser();
        }, 1000);
    }
    var loadFBMessage = function () {
        $(".FI-loading").hide();
        var tgturl = "//socialinviter.com/";
        if ($(".FI-SI-FB-loading-holder").length == 0)
            $(".modal-SI-FI").find(".modal-SI-body").prepend('<div class="posrel FI-SI-FB-loading-holder"><div class="FI-SI-FB-loading posabs"><span>Loading</span><img src=\"' + tgturl + 'assets/img/icons/processing.gif\" /></div></div>');
        $(".fbHolder").show();
        $(".modal-SI-FI").find(".modal-SI-holder").removeClass("modal-SI-small");
        $(".fb_dialog:gt(0)").remove();
        var fblink = "//socialinviter.com/", fbpic = "";
        if (friendsinviter.getConfig().servicepanel.facebooklink) {
            fblink = friendsinviter.getConfig().servicepanel.facebooklink;
        }
        var description = "";
        var title = "";
        FB.ui({
            method: 'send',
            name: title,
            description: description,
            link: fblink,
            picture: fbpic
        },
        function (response) {
            window.clearInterval(fbloop);
            if (response) {

            }
            FB = undefined;
            $(".modal-SI-close").click();
        });
        $(".fb_dialog:gt(0)").remove();
        fbloop = window.setInterval(checkForDuplicateFBView, 10);
    }
    var checkForDuplicateFBView = function () {
        if ($(".fb_dialog").length > 0) {
            $(".fb_dialog:gt(0)").remove();
            $(".modal-SI-FI").find(".modal-SI-holder").removeClass("modal-SI-small");
            $(".fb_dialog").find(".FB_UI_Dialog").load(function () {
                $(".FI-SI-FB-loading-holder").remove();
                $(this).unbind("load");
                window.clearInterval(fbloop);
            });
        }
    }
    var loginfbuser = function () {
        try {
            if (FB.getAccessToken()) {
                processor_FI.loadFBMessage();
            }
            else {
                FB.login(function (response) {
                    if (response.status == "connected") {
                        processor_FI.loadFBMessage();
                    }
                    else {
                        modalSIFI.load({ "title": convertName(processor_FI.getService()), "body": "<div class='FI-loading'>Authentication failed, please <a href=\"javascript:;\" onclick=\"processor_FI.auth('" + processor_FI.getService() + "','friendsinviter')\">Try again.</a></div>" }, "show");
                        $(".modal-SI-FI").find(".modal-SI-holder").addClass("modal-SI-small");
                    }
                });
            }
        }
        catch (e) {
            processor_FI.loadFBMessage();
        }
    }

    var loadContactDetails = function (dom, data) {
        var domHTML = "<div class=\"details-FI-panel\"><ul>";
        domHTML += "<li>";
        domHTML += "<div class=\"leftpnl\"><i class=\"addr_i_FI FI-i\"></i><span>Address: </span></div>";
        domHTML += "<div class=\"rightpnl\">";
        var addrLen = data.address.length;
        var checklen = 0;
        for (var i = 0; i < addrLen; i++) {
            if (decodeURIComponent(data.address[i].formattedaddress).trim() != "") {
                checklen = 1;
                domHTML += "<div class=\"fl break\">" + decodeURIComponent(data.address[i].formattedaddress) + "</div>";
            }
        }
        if (checklen == 0) {
            domHTML += "<div class=\"fl break na\">Not available</div>";
        }
        domHTML += "</div>";
        domHTML += "</li>";
        domHTML += "<li>";
        domHTML += "<div class=\"leftpnl\"><i class=\"email_i_FI FI-i\"></i><span>Email: </span></div>";
        domHTML += "<div class=\"rightpnl\">";
        var emailLen = data.email.length;
        if (emailLen == 0) {
            domHTML += "<div class=\"fl break na\">Not available</div>";
        }
        else {
            for (var i = 0; i < emailLen; i++) {
                domHTML += "<div class=\"fl break\">" + decodeURIComponent(data.email[i]) + "</div>";
            }
        }
        domHTML += "</div>";
        domHTML += "</li>";
        domHTML += "<li>";
        domHTML += "<div class=\"leftpnl\"><i class=\"phone_i_FI FI-i\"></i><span>Phone: </span></div>";
        domHTML += "<div class=\"rightpnl\">";
        var phoneLen = data.phone.length;
        if (phoneLen == 0) {
            domHTML += "<div class=\"fl break na\">Not available</div>";
        }
        else {
            for (var i = 0; i < phoneLen; i++) {
                domHTML += "<div class=\"fl break\">" + decodeURIComponent(data.phone[i]) + "</div>";
            }
        }
        domHTML += "</div>";
        domHTML += "</li>";
        domHTML += "<li>";
        domHTML += "<div class=\"leftpnl\"><i class=\"birthday_i_FI FI-i\"></i><span>Birthday: </span></div>";
        domHTML += "<div class=\"rightpnl\">";
        var bday = [];
        if ((data.birthday.month != "0") && (data.birthday.month != null))
            bday.push(data.birthday.month);
        if ((data.birthday.day != "0") && (data.birthday.day != null))
            bday.push(data.birthday.day);
        if ((data.birthday.year != "00") && (data.birthday.year != null))
            bday.push(data.birthday.year);
        if (bday.length != 0) {
            domHTML += "<div class=\"fl break\">" + bday.join("-") + "</div>";
        }
        else {
            domHTML += "<div class=\"fl break na\">Not available</div>";
        }
        domHTML += "</div>";
        domHTML += "</li>";
        domHTML += "<li>";
        domHTML += "<div class=\"leftpnl\"><i class=\"website_i_FI FI-i\"></i><span>Website: </span></div>";
        domHTML += "<div class=\"rightpnl\">";
        var websiteLen = data.website.length;
        if (websiteLen == 0) {
            domHTML += "<div class=\"fl break na\">Not available</div>";
        }
        else {
            for (var i = 0; i < websiteLen; i++) {
                domHTML += "<div class=\"fl break\">" + decodeURIComponent(data.website[i]) + "</div>";
            }
        }
        domHTML += "</div>";
        domHTML += "</li>";
        domHTML += "<li>";
        domHTML += "<div class=\"leftpnl\"><i class=\"notes_i_FI FI-i\"></i><span>Notes: </span></div>";
        domHTML += "<div class=\"rightpnl\">";
        if (decodeURIComponent(data.notes).trim() == "") {
            domHTML += "<div class=\"fl break na\">Not available</div>";
        }
        else {
            domHTML += "<div class=\"fl break\">" + decodeURIComponent(data.notes) + "</div>";
        }
        domHTML += "</div>";
        domHTML += "</li>";
        domHTML += "</ul></div>";
        dom.html(domHTML);
    }
    var gmailImageProcessor = function () {
        googlePicArray = $(".FI-contact-photo");
        googlewin = window.setInterval(function () {
            for (var i = 0; i < 10; i++) {
                if (googlePicArray.length > 0) {
                    var tgt = $(googlePicArray.splice(0, 1));
                    tgt.attr("src", tgt.attr("originalsrc"));
                }
                else {
                    window.clearInterval(googlewin);
                    break;
                }
            }
        }, 1000);
    }
    var showStep2 = function (stepType) {
        var step2Dom = "";
        if ($(".mailing-step2").length != 0) {
            step2Dom = "";
            var abookContacts = selectedfriendsData.friends;
            if (abookContacts) {
                var len = abookContacts.length;
                for (var i = 0; i < len; i++) {
                    if (abookContacts[i]) {
                        step2Dom += "<li class=\"to-contacts-ul-li\">";
                        var name = ((abookContacts[i].name.first_name != null) ? abookContacts[i].name.first_name : "");
                        name += ((abookContacts[i].name.last_name != null) ? " " + abookContacts[i].name.last_name : "");
                        step2Dom += "<div class=\"selected-email\" title=\"" + name + "\">";
                        step2Dom += "<div class=\"text-email\">" + name + "</div>";
                        step2Dom += "<div class=\"remove-email\" index=\"" + i + "\">X</div>";
                        step2Dom += "</div>";
                        step2Dom += "</li>";
                    }
                }
            }
            $(".mailing-step2").show();
            $(".to-contacts-ul").html(step2Dom);

        }
        else {
            step2Dom = "<div class=\"mailing-wrapper step2 mailing-step2\">";
            step2Dom += "<div class=\"mailing-wrapper-header\">";
            step2Dom += "<div class=\"fl mailing-header-title\">";
            step2Dom += friendsinviter.getConfig().servicepanel.content.step2.title;
            step2Dom += "</div>";
            step2Dom += "<div class=\"fr mailing-step-count\">";
            var stpnavig = friendsinviter.getConfig().servicepanel.content.navigation.replace("{0}", "2");
            step2Dom += stpnavig.replace("{1}", "2");
            step2Dom += "</div></div>";
            step2Dom += "<div class=\"mailing-row\">";
            var stp2to = friendsinviter.getConfig().servicepanel.content.step2.to;
            step2Dom += "<div class=\"mailing-label\">" + stp2to + "</div>";
            step2Dom += "<div class=\"fl\">";

            if (stepType) {
                step2Dom += "<div class=\"to-contacts\">";
                step2Dom += "<input type=\"text\" class=\"FI-email-text\" />";
                var stp2note = friendsinviter.getConfig().servicepanel.content.step2.note;
                step2Dom += "</div><div class=\"FI-email-note\">" + stp2note + "</div>";
            }
            else {
                step2Dom += "<div class=\"to-contacts\">";
                step2Dom += "<ul class=\"to-contacts-ul\">";
                var abookContacts = selectedfriendsData.friends;
                if (abookContacts) {
                    var len = abookContacts.length;
                    for (var i = 0; i < len; i++) {
                        if (abookContacts[i]) {
                            step2Dom += "<li class=\"to-contacts-ul-li\">";
                            var name = ((abookContacts[i].name.first_name != null) ? abookContacts[i].name.first_name : "");
                            name += ((abookContacts[i].name.last_name != null) ? " " + abookContacts[i].name.last_name : "");
                            step2Dom += "<div class=\"selected-email\" title=\"" + name + "\">";
                            step2Dom += "<div class=\"text-email\">" + name + "</div>";
                            step2Dom += "<div class=\"remove-email\" index=\"" + i + "\">X</div>";
                            step2Dom += "</div>";
                            step2Dom += "</li>";
                        }
                    }
                }
                step2Dom += "</ul></div>";
            }
            step2Dom += "</div></div><div class=\"mailing-row\">";
            var stp2subject = friendsinviter.getConfig().servicepanel.content.step2.subject;
            step2Dom += "<div class=\"mailing-label\">" + stp2subject + "</div>";
            step2Dom += "<div class=\"fl\">";
            var pluginsub = "", pluginmsg = "";
            if (toString.call(friendsinviter.getConfig().servicepanel.subject) == "[object String]") {
                pluginsub = decodeURIComponent(friendsinviter.getConfig().servicepanel.subject);
            }
            else if (toString.call(friendsinviter.getConfig().servicepanel.subject) == "[object Object]") {
                if (friendsinviter.getConfig().servicepanel.subject[friendsinviter.getService()])
                    pluginsub = friendsinviter.getConfig().servicepanel.subject[friendsinviter.getService()];
            }
            if (toString.call(friendsinviter.getConfig().servicepanel.message) == "[object String]") {
                pluginmsg = decodeURIComponent(friendsinviter.getConfig().servicepanel.message);
            }
            else if (toString.call(friendsinviter.getConfig().servicepanel.message) == "[object Object]") {
                if (friendsinviter.getConfig().servicepanel.message[friendsinviter.getService()])
                    pluginmsg = friendsinviter.getConfig().servicepanel.message[friendsinviter.getService()];
            }
            step2Dom += "<input type=\"text\" class=\"mailing-subject txtbx\" value=\"" + pluginsub + "\">";
            step2Dom += "</div></div><div class=\"mailing-row\">";
            var stp2message = friendsinviter.getConfig().servicepanel.content.step2.message;
            step2Dom += "<div class=\"mailing-label\">" + stp2message + "</div>";
            step2Dom += "<div class=\"fl\">";
            step2Dom += "<textarea class=\"mailing-message txtarea\">" + pluginmsg + "</textarea>";
            step2Dom += "</div></div>";
            step2Dom += "<div class=\"mailing-footer-holder\" >";
            step2Dom += "<div class=\"mailing-footer\" style=\"border:\">";
            step2Dom += "<div class=\"fl mailing-footer-back\" >";
            var stp2back = friendsinviter.getConfig().servicepanel.content.step2.button.back;
            var stp2send = friendsinviter.getConfig().servicepanel.content.step2.button.send;
            step2Dom += "<div class=\"FI-list-container-back step2-back\">" + stp2back + "</div></div>";
            step2Dom += "<div class=\"fr\" >";
            step2Dom += "<div class=\"FI-list-container-proceed proceed-send\">" + stp2send + "</div>";
            step2Dom += "<div class=\"fr fisendloading\" ><img src='//socialinviter.com/assets/img/icons/processing.gif'/></div>";
            step2Dom += "</div></div></div></div>";
            if ($(".step2").length == 0) {
                $(".modal-SI-FI").find(".modal-SI-body").append(step2Dom);
                if ($(".modal-SI-FI").find(".modal-SI-body").find(".modal-message-holder").length == 0) {
                    $(".modal-SI-FI").find(".modal-SI-body").prepend("<div class='modal-message-holder'><div class='modal-message'></div></div>"); ;
                }
            }
            else {
                $(".modal-SI-FI").find(".modal-SI-body").html(step2Dom).prepend("<div class='modal-message-holder'><div class='modal-message'></div></div>");
            }
        }
        $(".proceed-send").unbind("click").click(function () {
            if ($(this).hasClass("steptwodisable")) {
                if ($(".modal-SI-FI").find(".to-contacts-ul").find(".to-contacts-ul-li").length == 0) {
                    modalSIFI.showErrorMessage(friendsinviter.getConfig().servicepanel.content.step1.validation.selectfriend);
                }
            }
            else {
                if ($.trim($(".mailing-subject").val()) == "") {
                    modalSIFI.showErrorMessage(friendsinviter.getConfig().servicepanel.content.step2.validation.subject);
                }
                else {
                    if ($.trim($(".mailing-message").val()) == "") {
                        modalSIFI.showErrorMessage(friendsinviter.getConfig().servicepanel.content.step2.message);
                    }
                    else {
                        $(".modal-SI-FI").find(".proceed-send").addClass("steptwodisable");
                        psend = $(this);
                        sendMessage();
                    }
                }

            }
        });
        $(".step1").hide();
        $(".step2-back").unbind("click").click(function (event) {
            $(".step2").hide();
            $(".step1").show();
            resizeStep1();
            if (friendsinviter.getConfig().callbacks) {
                if (friendsinviter.getConfig().callbacks.back) {
                    friendsinviter.getConfig().callbacks.back(event, convertName(processor_FI.getService()));
                }
            }
        });
        if ($(".mailing-wrapper-header").is(":visible") == true) {
            $(".modal-SI-FI").find(".modal-SI-holder").height($(".step2").height() + 80);
        }
        else {
            $(".modal-SI-FI").find(".modal-SI-holder").height($(".step2").height() + 65);
        }
        removeContact();

    }
    var removeContact = function () {
        $(".remove-email").unbind("click").click(function () {
            var index = parseInt($(this).attr("index"));
            selectedfriendsData.friends[index] = undefined;
            $(".FI-contact-ul-li-list").eq(index).find("input").prop("checked", false);
            $("#chkselall").prop("checked", false);
            $(this).closest("li").remove();
            var contLen = processor_FI.getSelectedContacts().friends.length;
            if (contLen == 0)
                $(".proceed-send").addClass("steptwodisable");
            else
                $(".proceed-send").removeClass("steptwodisable");
            $(".FI-Contact-count").html(contLen + " Selected");
        });
    }
    return {
        init: initialize,
        getFromStore: getFromStore,
        authCallback: authCallback,
        accessCallback: accessCallback,
        contactsCallback: contactsCallback,
        messageCallback: messageCallback,
        updateUser: updateUser,
        uploadCallback: uploadCallback,
        startgrabbing: startgrabbing,
        getAllContacts: getAllContacts,
        getSelectedContacts: getSelectedContacts,
        selectContact: selectContact,
        deSelectContact: deSelectContact,
        deSelectAllContacts: deSelectAllContacts,
        selectAllContacts: selectAllContacts,
        showStep1: showStep1,
        showStep2: showStep2,
        auth: auth,
        processLock: processLock,
        getService: getService,
        setPopupError: setPopupError,
        submitUploading: submitUploading,
        loadContactDetails: loadContactDetails,
        autoSuggest: autoSuggest,
        loadFBMessage: loadFBMessage,
        reFetchFBkey: reFetchFBkey,
        FBCallback: FBCallback
    }
})();
var storeFetchedFriends = function (service, data) {
}
var messageSentTo = function (service, recipients, statusObj) {
}
window.onload = new function () {
    if (window.location.href.indexOf("/oauth.html") != -1) {
        processor_FI.init();
        modalSIFI.init();
        $(".modal-SI-CFI-BG,.modal-SI-FI").hide();
    }
}
var loadFriendsWidget = function(){
    $(document).ready(function(){
        if (window.location.href.indexOf("/oauth.html") == -1){
           friendsinviter.load({
               target:"socialinviter-FI",
               showmodal:true,
               facebooklink:"",
               showsearch:true,    
               callbacks: { 
                   "loaded": function (service, data) {
                       storeFetchedFriends(service, data);
                   },
                   "send": function (service, recipients, statusObj) {
                       messageSentTo(service, recipients, statusObj);
                       if (statusObj) {
                          if (statusObj.data.status == "success") {
                               $(".step2-back").click();
                               modalSIFI.showSuccessMessage("Message sent");
                          }
                          else
                               modalSIFI.showErrorMessage("Message sending failed");
                       }
                       else
                          modalSIFI.showErrorMessage("Message sending failed");
                   }
               },
               subject:"Lets spread the word!",
               message:"Your custom message goes here...",
               type:"full",
               alignment:"horizontal",
               position:{
                   right:"",
                   left:"wall",
                   top:"200px"
               }
           });
        }
   });
};
loadFriendsWidget();
