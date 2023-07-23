var t = getApp();
var a = require("../../utils/util.js")
var e = null
var i = []
var n = []
var o = []
var s = 0
var r = 0

Page({
    data: {
        clearButton: "",
        saveButton: "",
        okButton: "",
        cancelButton: "",
        language: "",
        tip: "",
        waterMarkText: "",
        waterMarkShow: !0,
        photo: "",
        scrollWidth: 0,
        scrollHeight: 0,
        hiddenmodalput: !0,
        current_dim: "",
        current_dim_color: "",
        current_dim_font_size: "",
        input_dim: "",
        showModal: !1,
        showCanvas: !1,
        shareImgPath: "",
        filePath: "",
        imgwidth: "",
        imgheight: "",
        rawwidth: "",
        rawheight: "",
        horzPhoto: !1,
        horzPhoto2: !1,
        distance: "",
        img_hide: !1,
        input_focus: !1,
        angle: "",
        input_title: "",
        inputSize: "",
        inputText: "",
        input_type: "number",
        photo_path: "",
        platform_os: "",
        noFirstLogin: !1,
        guideImg: "",
        rgb: 'rgb(0,154,97)',//初始值
        pick: false
    },
    // 显示取色器
    toPick: function () {
        this.setData({
        pick: true
        })
    },
    //取色结果回调
    pickColor(e) {
        let rgb = e.detail.color;
    },
    close: function() {
        this.setData({
            showSignModal: false
        });
    },
    modaltouch: function(t) {},
    start: function(t) {
        var a = {
            x: t.changedTouches[0].x,
            y: t.changedTouches[0].y
        };
        i.push(a);
    },
    move: function(t) {
        var a = {
            x: t.touches[0].x,
            y: t.touches[0].y
        };
        a.x < 0 && (a.x = 0);
        a.y < 0 && (a.y = 0);
        a.x > s && (a.x = s);
        a.y > r && (a.y = r); 
        i.length >= 2 ? (i[1] = a, this.draw(i)) : i.push(a);
    },
    drawMagnifier: function() {
        if (!(i.length < 2)) {
            var t = {
                x: i[1].x,
                y: i[1].y
            };
            t.y < 60 ? t.x > 120 ? t.x -= 120 : (t.x += 60, t.y += 60) : (t.x -= 60, t.y -= 60);
            var a = i[0], n = i[1], o = Math.sqrt((n.x - a.x) * (n.x - a.x) + (n.y - a.y) * (n.y - a.y)), h = (n.x - a.x) / o, l = (n.y - a.y) / o;
            try {
                e.save(), e.beginPath(), e.arc(t.x, t.y, 60, 0, 2 * Math.PI, !1), e.clip(), e.translate(t.x - 60, t.y - 60);
                var d = this.data.rawwidth / s, u = this.data.rawheight / r;
                e.drawImage(this.data.photo, (i[1].x - 15) * d, (i[1].y - 15) * u, 60, 60, 0, 0, 120, 120), 
                e.beginPath(), e.setLineWidth(2), e.setStrokeStyle("#000000"), e.moveTo(60, 60), 
                e.lineTo(60 - 60 * h, 60 - 60 * l), e.stroke(), e.setLineWidth(1), e.setStrokeStyle("#FFFF00"), 
                e.moveTo(60, 60), e.lineTo(60 - 60 * h, 60 - 60 * l), e.stroke(), e.restore();
            } catch (t) {
                e.restore();
            }
        }
    },
    end: function(t) {
        var a = [];
        a.push(i[0]);
        i.length > 1 ? a.push(i[1]) : a.push(i[0]), o.push("0"), n.push(a), 
        this.modalinput();
        for (var e = i.length - 1; e >= 0; e--) i.pop();
    },
    cancel: function(t) {},
    tap: function(t) {},
    error: function(t) {},
    drawArrow: function(t, a, e, i, n, o, s, r, h) {
        debugger
        // o = o, s = s, r = r, h = h;
        var l = 180 * Math.atan2(e - n, a - i) / Math.PI;
        var d = (l + o) * Math.PI / 180;
        var u = (l - o) * Math.PI / 180;
        var c = s * Math.cos(d);
        var g = s * Math.sin(d);
        var p = s * Math.cos(u);
        var w = s * Math.sin(u);
        t.save();
        t.beginPath();
        var x = a - c;
        var f = e - g;
        t.moveTo(x, f), t.lineTo(a, e), x = a - p, f = e - w, t.lineTo(x, f), t.moveTo(a, e), 
        t.lineTo(i, n), x = i + c, f = n + g, t.moveTo(x, f), t.lineTo(i, n), x = i + p, 
        f = n + w, t.lineTo(x, f), t.strokeStyle = h, t.lineWidth = r, t.stroke(), t.restore(), 
        this.drawArrow2(t, a, e, i, n, o, s, 2, "#000000");
    },
    drawArrow2: function(t, a, e, i, n, o, s, r, h) {
        // o = o, s = s, r = r, h = h;
        var l = 180 * Math.atan2(e - n, a - i) / Math.PI, d = (l + o) * Math.PI / 180, u = (l - o) * Math.PI / 180, c = s * Math.cos(d), g = s * Math.sin(d), p = s * Math.cos(u), w = s * Math.sin(u);
        t.save(), t.beginPath();
        var x = a - c, f = e - g;
        t.moveTo(x, f), t.lineTo(a, e), x = a - p, f = e - w, t.lineTo(x, f), t.moveTo(a, e), 
        t.lineTo(i, n), x = i + c, f = n + g, t.moveTo(x, f), t.lineTo(i, n), x = i + p, 
        f = n + w, t.lineTo(x, f), t.strokeStyle = h, t.lineWidth = r, t.stroke(), t.restore();
    },
    drawdim: function(t, a) {
        var i = t[0];
        var n = t[1];
        n.x = parseInt(n.x);
        n.y = parseInt(n.y);
        e.font = "bold 14px Arial";
        e.setStrokeStyle("#FFFF00"); 
        if (i == n) {
            e.beginPath();
            e.moveTo(i.x, i.y);
            e.lineTo(n.x, n.y);
        } else {
            this.drawArrow(e, i.x, i.y, n.x, n.y, 30, 10, 1, "#FFFF00");
            this.setData({
                angle: 180 * Math.atan2(i.y - n.y, i.x - n.x) / Math.PI
            });
        }
        e.stroke();
        e.save();
        e.translate((i.x + n.x) / 2, (i.y + n.y) / 2);
        var o = Math.atan2(n.y - i.y, n.x - i.x);
        e.setTextAlign("center"), o < -Math.PI / 2 ? o += Math.PI : o > Math.PI / 2 && (o -= Math.PI), 
        e.rotate(o), e.setStrokeStyle("#000000"), e.strokeText(a, 0, -3), e.setFillStyle("#FFFF00"), 
        e.fillText(a, 0, -3), e.restore();
    },
    draw: function(t) {
        this.drawdim(t, this.data.inputSize);
        e.draw(!1);
        for (var a = 0; a < n.length; a++) {
            var i = n[a];
            this.drawdim(i, o[a]);
        }
        e.draw(!0);
    },
    waterMark: function() {
        var t = a.formatTime(new Date());
        e.font = "bold 9px Arial", e.setFillStyle("#fff"), e.drawImage("../../images/watermark.png", s - 76, r - 38, 70, 22), 
        e.setTextAlign("center"), e.fillText(t, s - 40, r - 6);
    },
    clearClick: function() {
        if (e.clearRect(0, 0, s, r), n.length > 0 && (n.pop(), o.pop()), n.length > 0) for (var t = 0; t < n.length; t++) {
            var a = n[t];
            this.drawdim(a, o[t]), e.draw(!0);
        } else e.draw(!0);
    },
    clearCancel: function() {
        if (e.clearRect(0, 0, s, r), n.length > 0 && (n.pop(), o.pop()), n.length > 0) for (var t = 0; t < n.length; t++) {
            var a = n[t];
            this.drawdim(a, o[t]), e.draw(!0);
        } else e.draw(!0);
    },
    imageLoad: function(t) {
        let a = t.detail.width;
        let e = t.detail.height;
        if (e / a == 2) {
            wx.showModal({
                content: "暂不支持18:9比例标注。请调整相机拍照比例后，再进行拍照标注，谢谢！",
                showCancel: !1,
                success: function(t) {
                    wx.redirectTo({
                        url: "/pages/index/index"
                    });
                }
            })
        }
        if (a > e) {
            this.setData({
                horzPhoto2: !0
            });
            this.setData({
                rawwidth: a,
                rawheight: e
            });
        }
        var i = this.data.scrollWidth;
        let n = this.data.scrollHeight - 100;
        let o = a / i
        let h = parseInt(a) / o
        let l = parseInt(e) / o
        let d = h.toFixed(0)
        let u = l.toFixed(0);
        if (u > n) {
            this.setData({
                canvash: n
            });
            var c = e / (r = n);
            d = (parseInt(a) / c).toFixed(0), this.data.horzPhoto ? this.setData({
                canvasw: d,
                imgwidth: n
            }) : this.setData({
                canvasw: d,
                imgwidth: d
            }), s = d;
        } else {
            console.log("scrollHeight - ", n);
            console.log("imgheight - ", u);
            this.setData({
                distance: (n - u) / 2,
                canvash: u,
                canvasw: i,
                imgwidth: i
            }); 
            s = i; 
            r = u; 
            if (this.data.horzPhoto) {
                this.setData({
                    imgwidth: u
                });
            }
        }
    },
    onLoad: function(t) {
        let i = [];
        let n = [];
        let o = [];
        (e = wx.createCanvasContext("firstCanvas")).setLineWidth(1); 
        e.setLineCap("round"); 
        e.setLineJoin("round");
        e.font = "bold 24px Arial";
        e.setTextAlign("center"); 
        e.setTextBaseline("normal");
    },
    onReady: function() {
        let s = 0; 
        let r = 0;
        var a = this;
        wx.getSystemInfo({
            success: function(e) {
                "zh" == e.language || "zh_CN" == e.language ? (a.setData({
                    clearButton: "清除",
                    saveButton: "保存",
                    okButton: "确认",
                    cancelButton: "取消",
                    inputSize: "输入尺寸",
                    inputText: "输入文字",
                    tip: "暂不支持18:9比例标注。请调整相机拍照比例后，再进行拍照标注，谢谢！",
                    waterMarkText: "量尺宝",
                    waterMarkShow: !0
                }), wx.setNavigationBarTitle({
                    title: "量尺宝"
                })) : (a.setData({
                    clearButton: "Clear",
                    saveButton: "Save",
                    okButton: "OK",
                    cancelButton: "Cancel",
                    inputSize: "Size",
                    inputText: "Text",
                    tip: "18:9 photo is not supported yet, please rescale photo and remark, thank you!",
                    waterMarkText: "",
                    waterMarkShow: !1
                }), wx.setNavigationBarTitle({
                    title: "iMeasure"
                }));
                s = e.windowWidth;
                r = e.windowHeight;
                a.setData({
                    scrollWidth: e.windowWidth,
                    scrollHeight: e.windowHeight,
                    photo: t.globalData.imageList,
                    platform_os: e.platform,
                    noFirstLogin: wx.getStorageSync("noFirstLogin")
                });
                if (a.data.noFirstLogin) {
                    a.setData({
                        showCanvas: !0
                    })
                } else {
                    a.setData({
                        guideImg: "../../images/guide.png"
                    })
                }
            }
        });
        this.setData({
            noFirstLogin: true,
            showCanvas: true
        })
    },
    canvasShare: function() {
        var t = this;
        var a = (this.data.imgwidth, this.data.imgheight, this.data.rawwidth);
        var i = this.data.rawheight;
        wx.getImageInfo({
            src: t.data.photo,
            success: function(h) {
                t.data.horzPhoto ? (e.translate(s, 0), e.rotate(90 * Math.PI / 180), e.drawImage(h.path, 0, 0, i, a, 0, 0, r, s), 
                e.rotate(-90 * Math.PI / 180), e.translate(-s, 0)) : e.drawImage(h.path, 0, 0, a, i, 0, 0, s, r);
                for (var l = 0; l < n.length; l++) {
                    var d = n[l];
                    t.drawdim(d, o[l]);
                }
                t.data.waterMarkShow && t.waterMark(), t.setData({
                    img_hide: !0
                }), "ios" == t.data.platform_os ? e.draw(!0, function() {
                    wx.canvasToTempFilePath({
                        canvasId: "firstCanvas",
                        fileType: "jpg",
                        success: function(t) {
                            wx.saveImageToPhotosAlbum({
                                filePath: t.tempFilePath,
                                success: function(t) {
                                    wx.redirectTo({
                                        url: "/pages/index/index?type=1"
                                    });
                                },
                                fail: function(t) {}
                            });
                        },
                        fail: function(t) {}
                    });
                }) : (e.draw(!0), setTimeout(function() {
                    wx.canvasToTempFilePath({
                        canvasId: "firstCanvas",
                        fileType: "jpg",
                        success: function(t) {
                            wx.saveImageToPhotosAlbum({
                                filePath: t.tempFilePath,
                                success: function(t) {
                                    wx.redirectTo({
                                        url: "/pages/index/index?type=1"
                                    });
                                },
                                fail: function(t) {}
                            });
                        },
                        fail: function(t) {}
                    });
                }, 500));
            }
        });
    },
    modalinput: function() {
        var t = n[n.length - 1], a = t[0], e = t[1];
        Math.abs(e.x - a.x) + Math.abs(e.y - a.y) < 20 ? this.setData({
            hiddenmodalput: !this.data.hiddenmodalput,
            input_focus: !0,
            input_title: this.data.inputText,
            input_type: "text",
            showCanvas: !1
        }) : this.setData({
            hiddenmodalput: !this.data.hiddenmodalput,
            input_focus: !0,
            input_title: this.data.inputSize,
            input_type: "number",
            showCanvas: !1
        });
    },
    cancel2: function() {
        this.setData({
            hiddenmodalput: !0,
            input_focus: !1,
            input_dim: "",
            showCanvas: !0
        }), this.clearCancel();
    },
    confirm: function() {
        this.setData({
            hiddenmodalput: !0,
            input_focus: !1,
            input_dim: "",
            showCanvas: !0
        });
        o[o.length - 1] = this.data.current_dim;
        for (var t = 0; t < n.length; t++) {
            var a = n[t];
            this.drawdim(a, o[t]);
            e.draw(true);
        }
    },
    dimInput: function(t) {
        this.setData({
            current_dim: t.detail.value
        });
    },
    dimColorInput: function(t) {
        this.setData({
            current_dim_color: t.detail.value
        });
    },
    dimFontSizeInput: function(t) {
        this.setData({
            current_dim_font_size: t.detail.value
        });
    },
    guide: function(t) {
        this.setData({
            noFirstLogin: !0,
            showCanvas: !0
        }), wx.setStorageSync("noFirstLogin", !0);
    },
    onShareAppMessage: function() {
        return {
            imageUrl: "../../images/share.png"
        };
    }
});