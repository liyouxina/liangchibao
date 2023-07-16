App({
    onLaunch: function() {
        var t = this;
        "string" == typeof wx.getStorageSync("firstLogin") && wx.setStorageSync("firstLogin", !0), 
        wx.getSystemInfo({
            success: function(o) {
                t.globalData.bottomLift = o.screenHeight - o.safeArea.bottom;
            },
            fail: function(t) {}
        });
    },
    globalData: {
        imageList: [ "" ],
        language: "",
        bottomLift: 0
    }
});