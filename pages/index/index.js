var e = require("../../lib/cos-auth"), t = "", o = "", a = {}, n = getApp(), i = null;

Page({
    data: {
        photoButton: "",
        albumButton: "",
        logoSrc: "",
        jikeShow: !1,
        bottomLift: n.globalData.bottomLift
    },
    takePhoto: function() {
        var e = this;
        wx.chooseImage({
            count: 1,
            sizeType: [ "compressed" ],
            sourceType: [ "camera" ],
            success: function(t) {
                n.globalData.imageList = t.tempFilePaths[0], e.getCos(t.tempFilePaths[0]);
            }
        });
    },
    getCos: function(e) {
        wx.showLoading({
            title: "加载中..."
        });
        var n = this, i = e.split("/"), s = i.length - 1;
        wx.request({
            url: "https://api-ct.yfway.com/cos/credential",
            method: "POST",
            data: {
                files: i[s],
                identity: "mj-cos-identity"
            },
            header: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            success: function(i) {
                console.log("getCos - ", i), 0 === i.data.code ? (a = i.data.data.credentials, t = i.data.data.host, 
                o = i.data.data.dir, n.uploadImg(e)) : (wx.hideLoading(), wx.showToast({
                    title: "临时密钥获取失败," + i.data.msg
                }));
            },
            error: function() {
                wx.hideLoading();
            }
        });
    },
    uploadImg: function(n) {
        this.data.userId;
        var i, s, c = this, r = t, u = function(t, o) {
            !function(e) {
                e(a);
            }(function(a) {
                o({
                    XCosSecurityToken: a.sessionToken,
                    Authorization: e({
                        SecretId: a.tmpSecretId,
                        SecretKey: a.tmpSecretKey,
                        Method: t.Method,
                        Pathname: t.Pathname
                    })
                });
            });
        };
        i = n, s = o, console.log("prefix - ", r), console.log("Key - ", s), u({
            Method: "POST",
            Pathname: "/"
        }, function(e) {
            wx.uploadFile({
                url: r,
                name: "file",
                filePath: i,
                formData: {
                    key: s,
                    success_action_status: 200,
                    Signature: e.Authorization,
                    "x-cos-security-token": e.XCosSecurityToken,
                    "Content-Type": ""
                },
                success: function(e) {
                    console.log("res - ", e);
                    var t, o = r + (t = s, encodeURIComponent(t).replace(/!/g, "%21").replace(/'/g, "%27").replace(/\(/g, "%28").replace(/\)/g, "%29").replace(/\*/g, "%2A")).replace(/%2F/g, "/");
                    200 === e.statusCode ? c.checkImg(o) : (wx.hideLoading(), wx.showModal({
                        title: "上传失败-" + e.statusCode,
                        content: JSON.stringify(e),
                        showCancel: !1
                    }));
                },
                fail: function(e) {
                    wx.hideLoading(), wx.showModal({
                        title: "上传失败2",
                        content: JSON.stringify(e),
                        showCancel: !1
                    });
                }
            }).onProgressUpdate(function(e) {});
        });
    },
    checkImg: function(e) {
        wx.request({
            url: "https://api-ct.yfway.com/cos/check/image/single",
            method: "POST",
            data: {
                identity: "mj-cos-identity",
                detectType: "Porn,Politics,Terrorism",
                detectUrl: e
            },
            header: {
                "Content-Type": "application/json"
            },
            success: function(e) {
                console.log("checkImg - ", e), "0" == e.data.data.result ? wx.redirectTo({
                    url: "/pages/demo/demo"
                }) : wx.showToast({
                    title: "图片审查失败，请重新拍摄",
                    icon: "none",
                    duration: 3e3
                });
            }
        });
    },
    choosePhoto: function() {
        var e = this;
        wx.chooseImage({
            count: 1,
            sizeType: [ "compressed" ],
            sourceType: [ "album" ],
            success: function(t) {
                n.globalData.imageList = t.tempFilePaths[0], e.getCos(t.tempFilePaths[0]);
            }
        });
    },
    toJike: function() {
        wx.navigateToMiniProgram({
            appId: "wx50742ae1bad8eeb3",
            envVersion: "release",
            success: function(e) {}
        });
    },
    toSphj: function() {
        wx.navigateToMiniProgram({
            appId: "wx51155c5475dc59b4",
            envVersion: "release",
            success: function(e) {}
        });
    },
    toWyhj: function() {
        wx.navigateToMiniProgram({
            appId: "wx1071603e37893742",
            envVersion: "release",
            success: function(e) {}
        });
    },
    toSmj: function() {
        wx.navigateToMiniProgram({
            appId: "wx58968ae71fd5528d",
            envVersion: "release",
            success: function(e) {}
        });
    },
    toWs: function() {
        wx.navigateToMiniProgram({
            appId: "wxf8560c0d585d5843",
            envVersion: "release",
            success: function(e) {}
        });
    },
    toMjzxgn: function() {
        wx.navigateToMiniProgram({
            appId: "wxb5afe96bb7f376cd",
            envVersion: "release",
            success: function(e) {}
        });
    },
    onLoad: function(e) {
        var t = this;
        wx.getSystemInfo({
            success: function(e) {
                n.globalData.language = e.language, "zh" == e.language || "zh_CN" == e.language ? (t.setData({
                    photoButton: "拍照",
                    albumButton: "从相册中选择",
                    logoSrc: "../../images/bg.png",
                    jikeShow: !0
                }), wx.setNavigationBarTitle({
                    title: "量尺专家"
                })) : (t.setData({
                    photoButton: "Take Photo",
                    albumButton: "From Album",
                    logoSrc: "../../images/bg2.png",
                    jikeShow: !1
                }), wx.setNavigationBarTitle({
                    title: "iMeasure"
                }));
            }
        }), wx.createInterstitialAd && ((i = wx.createInterstitialAd({
            adUnitId: "adunit-17508a3c91b1f02f"
        })).onLoad(function() {}), i.onError(function(e) {}), i.onClose(function(e) {})), 
        e && 1 == e.type && i.show().catch(function(e) {
            console.error(e);
        });
    },
    onShareAppMessage: function() {
        return {
            title: "宝藏神器，设计师量尺必备！免费！好用！",
            imageUrl: "../../images/share.png"
        };
    },
    onShareTimeline: function() {
        return {
            title: "宝藏神器，设计师量尺必备！免费！好用！",
            imageUrl: "../../images/share.png"
        };
    }
});