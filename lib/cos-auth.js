var t = require("../@babel/runtime/helpers/typeof");

!function() {
    function e(t) {
        return encodeURIComponent(t).replace(/!/g, "%21").replace(/'/g, "%27").replace(/\(/g, "%28").replace(/\)/g, "%29").replace(/\*/g, "%2A");
    }
    var n = n || function(t, e) {
        var n = {}, r = n.lib = {}, i = function() {}, s = r.Base = {
            extend: function(t) {
                i.prototype = this;
                var e = new i();
                return t && e.mixIn(t), e.hasOwnProperty("init") || (e.init = function() {
                    e.$super.init.apply(this, arguments);
                }), e.init.prototype = e, e.$super = this, e;
            },
            create: function() {
                var t = this.extend();
                return t.init.apply(t, arguments), t;
            },
            init: function() {},
            mixIn: function(t) {
                for (var e in t) t.hasOwnProperty(e) && (this[e] = t[e]);
                t.hasOwnProperty("toString") && (this.toString = t.toString);
            },
            clone: function() {
                return this.init.prototype.extend(this);
            }
        }, o = r.WordArray = s.extend({
            init: function(t, e) {
                t = this.words = t || [], this.sigBytes = null != e ? e : 4 * t.length;
            },
            toString: function(t) {
                return (t || c).stringify(this);
            },
            concat: function(t) {
                var e = this.words, n = t.words, r = this.sigBytes;
                if (t = t.sigBytes, this.clamp(), r % 4) for (var i = 0; i < t; i++) e[r + i >>> 2] |= (n[i >>> 2] >>> 24 - i % 4 * 8 & 255) << 24 - (r + i) % 4 * 8; else if (65535 < n.length) for (i = 0; i < t; i += 4) e[r + i >>> 2] = n[i >>> 2]; else e.push.apply(e, n);
                return this.sigBytes += t, this;
            },
            clamp: function() {
                var e = this.words, n = this.sigBytes;
                e[n >>> 2] &= 4294967295 << 32 - n % 4 * 8, e.length = t.ceil(n / 4);
            },
            clone: function() {
                var t = s.clone.call(this);
                return t.words = this.words.slice(0), t;
            },
            random: function(e) {
                for (var n = [], r = 0; r < e; r += 4) n.push(4294967296 * t.random() | 0);
                return new o.init(n, e);
            }
        }), a = n.enc = {}, c = a.Hex = {
            stringify: function(t) {
                var e = t.words;
                t = t.sigBytes;
                for (var n = [], r = 0; r < t; r++) {
                    var i = e[r >>> 2] >>> 24 - r % 4 * 8 & 255;
                    n.push((i >>> 4).toString(16)), n.push((15 & i).toString(16));
                }
                return n.join("");
            },
            parse: function(t) {
                for (var e = t.length, n = [], r = 0; r < e; r += 2) n[r >>> 3] |= parseInt(t.substr(r, 2), 16) << 24 - r % 8 * 4;
                return new o.init(n, e / 2);
            }
        }, h = a.Latin1 = {
            stringify: function(t) {
                var e = t.words;
                t = t.sigBytes;
                for (var n = [], r = 0; r < t; r++) n.push(String.fromCharCode(e[r >>> 2] >>> 24 - r % 4 * 8 & 255));
                return n.join("");
            },
            parse: function(t) {
                for (var e = t.length, n = [], r = 0; r < e; r++) n[r >>> 2] |= (255 & t.charCodeAt(r)) << 24 - r % 4 * 8;
                return new o.init(n, e);
            }
        }, u = a.Utf8 = {
            stringify: function(t) {
                try {
                    return decodeURIComponent(escape(h.stringify(t)));
                } catch (t) {
                    throw Error("Malformed UTF-8 data");
                }
            },
            parse: function(t) {
                return h.parse(unescape(encodeURIComponent(t)));
            }
        }, f = r.BufferedBlockAlgorithm = s.extend({
            reset: function() {
                this._data = new o.init(), this._nDataBytes = 0;
            },
            _append: function(t) {
                "string" == typeof t && (t = u.parse(t)), this._data.concat(t), this._nDataBytes += t.sigBytes;
            },
            _process: function(e) {
                var n = this._data, r = n.words, i = n.sigBytes, s = this.blockSize, a = i / (4 * s);
                if (e = (a = e ? t.ceil(a) : t.max((0 | a) - this._minBufferSize, 0)) * s, i = t.min(4 * e, i), 
                e) {
                    for (var c = 0; c < e; c += s) this._doProcessBlock(r, c);
                    c = r.splice(0, e), n.sigBytes -= i;
                }
                return new o.init(c, i);
            },
            clone: function() {
                var t = s.clone.call(this);
                return t._data = this._data.clone(), t;
            },
            _minBufferSize: 0
        });
        r.Hasher = f.extend({
            cfg: s.extend(),
            init: function(t) {
                this.cfg = this.cfg.extend(t), this.reset();
            },
            reset: function() {
                f.reset.call(this), this._doReset();
            },
            update: function(t) {
                return this._append(t), this._process(), this;
            },
            finalize: function(t) {
                return t && this._append(t), this._doFinalize();
            },
            blockSize: 16,
            _createHelper: function(t) {
                return function(e, n) {
                    return new t.init(n).finalize(e);
                };
            },
            _createHmacHelper: function(t) {
                return function(e, n) {
                    return new l.HMAC.init(t, n).finalize(e);
                };
            }
        });
        var l = n.algo = {};
        return n;
    }(Math);
    !function() {
        var t = n, e = (s = t.lib).WordArray, r = s.Hasher, i = [], s = t.algo.SHA1 = r.extend({
            _doReset: function() {
                this._hash = new e.init([ 1732584193, 4023233417, 2562383102, 271733878, 3285377520 ]);
            },
            _doProcessBlock: function(t, e) {
                for (var n = this._hash.words, r = n[0], s = n[1], o = n[2], a = n[3], c = n[4], h = 0; 80 > h; h++) {
                    if (16 > h) i[h] = 0 | t[e + h]; else {
                        var u = i[h - 3] ^ i[h - 8] ^ i[h - 14] ^ i[h - 16];
                        i[h] = u << 1 | u >>> 31;
                    }
                    u = (r << 5 | r >>> 27) + c + i[h], u = 20 > h ? u + (1518500249 + (s & o | ~s & a)) : 40 > h ? u + (1859775393 + (s ^ o ^ a)) : 60 > h ? u + ((s & o | s & a | o & a) - 1894007588) : u + ((s ^ o ^ a) - 899497514), 
                    c = a, a = o, o = s << 30 | s >>> 2, s = r, r = u;
                }
                n[0] = n[0] + r | 0, n[1] = n[1] + s | 0, n[2] = n[2] + o | 0, n[3] = n[3] + a | 0, 
                n[4] = n[4] + c | 0;
            },
            _doFinalize: function() {
                var t = this._data, e = t.words, n = 8 * this._nDataBytes, r = 8 * t.sigBytes;
                return e[r >>> 5] |= 128 << 24 - r % 32, e[14 + (r + 64 >>> 9 << 4)] = Math.floor(n / 4294967296), 
                e[15 + (r + 64 >>> 9 << 4)] = n, t.sigBytes = 4 * e.length, this._process(), this._hash;
            },
            clone: function() {
                var t = r.clone.call(this);
                return t._hash = this._hash.clone(), t;
            }
        });
        t.SHA1 = r._createHelper(s), t.HmacSHA1 = r._createHmacHelper(s);
    }(), function() {
        var t = n, e = t.enc.Utf8;
        t.algo.HMAC = t.lib.Base.extend({
            init: function(t, n) {
                t = this._hasher = new t.init(), "string" == typeof n && (n = e.parse(n));
                var r = t.blockSize, i = 4 * r;
                n.sigBytes > i && (n = t.finalize(n)), n.clamp();
                for (var s = this._oKey = n.clone(), o = this._iKey = n.clone(), a = s.words, c = o.words, h = 0; h < r; h++) a[h] ^= 1549556828, 
                c[h] ^= 909522486;
                s.sigBytes = o.sigBytes = i, this.reset();
            },
            reset: function() {
                var t = this._hasher;
                t.reset(), t.update(this._iKey);
            },
            update: function(t) {
                return this._hasher.update(t), this;
            },
            finalize: function(t) {
                var e = this._hasher;
                return t = e.finalize(t), e.reset(), e.finalize(this._oKey.clone().concat(t));
            }
        });
    }(), function() {
        var t = n, e = t.lib.WordArray;
        t.enc.Base64 = {
            stringify: function(t) {
                var e = t.words, n = t.sigBytes, r = this._map;
                t.clamp();
                for (var i = [], s = 0; s < n; s += 3) for (var o = (e[s >>> 2] >>> 24 - s % 4 * 8 & 255) << 16 | (e[s + 1 >>> 2] >>> 24 - (s + 1) % 4 * 8 & 255) << 8 | e[s + 2 >>> 2] >>> 24 - (s + 2) % 4 * 8 & 255, a = 0; a < 4 && s + .75 * a < n; a++) i.push(r.charAt(o >>> 6 * (3 - a) & 63));
                var c = r.charAt(64);
                if (c) for (;i.length % 4; ) i.push(c);
                return i.join("");
            },
            parse: function(t) {
                var n = t.length, r = this._map, i = r.charAt(64);
                if (i) {
                    var s = t.indexOf(i);
                    -1 != s && (n = s);
                }
                for (var o = [], a = 0, c = 0; c < n; c++) if (c % 4) {
                    var h = r.indexOf(t.charAt(c - 1)) << c % 4 * 2, u = r.indexOf(t.charAt(c)) >>> 6 - c % 4 * 2;
                    o[a >>> 2] |= (h | u) << 24 - a % 4 * 8, a++;
                }
                return e.create(o, a);
            },
            _map: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/="
        };
    }();
    var r = function(t) {
        if (!t.SecretId) return console.error("missing param SecretId");
        if (!t.SecretKey) return console.error("missing param SecretKey");
        if ("4.0" === t.Version) return function(t) {
            var e = t.Pathname || "/", r = t.Expires, i = "", s = "", o = t.Bucket.match(/^(.+)-(\d+)$/);
            o && (i = o[1], s = o[2]);
            var a = parseInt(Math.random() * Math.pow(2, 32)), c = parseInt(Date.now() / 1e3), h = c + (void 0 === r ? 900 : 1 * r || 0), u = "/" + s + "/" + i + encodeURIComponent(e).replace(/%2F/g, "/"), f = "a=" + s + "&b=" + i + "&k=" + t.SecretId + "&e=" + h + "&t=" + c + "&r=" + a + "&f=" + u, l = n.HmacSHA1(f, t.SecretKey), p = n.enc.Utf8.parse(f);
            return l.concat(p).toString(n.enc.Base64);
        }(t);
        var r = (t = t || {}).SecretId, i = t.SecretKey, s = (t.Method || "get").toLowerCase(), o = t.Query || {}, a = t.Headers || {}, c = t.Pathname || "/", h = t.Expires, u = function(t) {
            var e = [];
            for (var n in t) t.hasOwnProperty(n) && e.push(n);
            return e.sort(function(t, e) {
                return (t = t.toLowerCase()) === (e = e.toLowerCase()) ? 0 : t > e ? 1 : -1;
            });
        }, f = function(t) {
            var n, r, i, s = [], o = u(t);
            for (n = 0; n < o.length; n++) i = void 0 === t[r = o[n]] || null === t[r] ? "" : "" + t[r], 
            r = e(r = r.toLowerCase()), i = e(i) || "", s.push(r + "=" + i);
            return s.join("&");
        }, l = parseInt(new Date().getTime() / 1e3) - 1, p = l + (void 0 === h ? 900 : 1 * h || 0), d = r, g = l + ";" + p, y = l + ";" + p, v = u(a).join(";").toLowerCase(), m = u(o).join(";").toLowerCase(), _ = n.HmacSHA1(y, i).toString(), w = [ s, c, f(o), f(a), "" ].join("\n"), S = [ "sha1", g, n.SHA1(w).toString(), "" ].join("\n");
        return [ "q-sign-algorithm=sha1", "q-ak=" + d, "q-sign-time=" + g, "q-key-time=" + y, "q-header-list=" + v, "q-url-param-list=" + m, "q-signature=" + n.HmacSHA1(S, _).toString() ].join("&");
    };
    "object" == ("undefined" == typeof module ? "undefined" : t(module)) ? module.exports = r : window.CosAuth = r;
}();