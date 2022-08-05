"use strict";
(self.webpackChunkangular_randomizer = self.webpackChunkangular_randomizer || []).push([[179], {
    931: () => {
        function te(e) {
            return "function" == typeof e
        }

        function Zr(e) {
            const n = e(r => {
                Error.call(r), r.stack = (new Error).stack
            });
            return n.prototype = Object.create(Error.prototype), n.prototype.constructor = n, n
        }

        const Yr = Zr(e => function (n) {
            e(this), this.message = n ? `${n.length} errors occurred during unsubscription:\n${n.map((r, o) => `${o + 1}) ${r.toString()}`).join("\n  ")}` : "", this.name = "UnsubscriptionError", this.errors = n
        });

        function tr(e, t) {
            if (e) {
                const n = e.indexOf(t);
                0 <= n && e.splice(n, 1)
            }
        }

        class ut {
            constructor(t) {
                this.initialTeardown = t, this.closed = !1, this._parentage = null, this._finalizers = null
            }

            unsubscribe() {
                let t;
                if (!this.closed) {
                    this.closed = !0;
                    const {_parentage: n} = this;
                    if (n) if (this._parentage = null, Array.isArray(n)) for (const i of n) i.remove(this); else n.remove(this);
                    const {initialTeardown: r} = this;
                    if (te(r)) try {
                        r()
                    } catch (i) {
                        t = i instanceof Yr ? i.errors : [i]
                    }
                    const {_finalizers: o} = this;
                    if (o) {
                        this._finalizers = null;
                        for (const i of o) try {
                            il(i)
                        } catch (s) {
                            t = t ?? [], s instanceof Yr ? t = [...t, ...s.errors] : t.push(s)
                        }
                    }
                    if (t) throw new Yr(t)
                }
            }

            add(t) {
                var n;
                if (t && t !== this) if (this.closed) il(t); else {
                    if (t instanceof ut) {
                        if (t.closed || t._hasParent(this)) return;
                        t._addParent(this)
                    }
                    (this._finalizers = null !== (n = this._finalizers) && void 0 !== n ? n : []).push(t)
                }
            }

            _hasParent(t) {
                const {_parentage: n} = this;
                return n === t || Array.isArray(n) && n.includes(t)
            }

            _addParent(t) {
                const {_parentage: n} = this;
                this._parentage = Array.isArray(n) ? (n.push(t), n) : n ? [n, t] : t
            }

            _removeParent(t) {
                const {_parentage: n} = this;
                n === t ? this._parentage = null : Array.isArray(n) && tr(n, t)
            }

            remove(t) {
                const {_finalizers: n} = this;
                n && tr(n, t), t instanceof ut && t._removeParent(this)
            }
        }

        ut.EMPTY = (() => {
            const e = new ut;
            return e.closed = !0, e
        })();
        const rl = ut.EMPTY;

        function ol(e) {
            return e instanceof ut || e && "closed" in e && te(e.remove) && te(e.add) && te(e.unsubscribe)
        }

        function il(e) {
            te(e) ? e() : e.unsubscribe()
        }

        const Ut = {
            onUnhandledError: null,
            onStoppedNotification: null,
            Promise: void 0,
            useDeprecatedSynchronousErrorHandling: !1,
            useDeprecatedNextContext: !1
        }, Kr = {
            setTimeout(e, t, ...n) {
                const {delegate: r} = Kr;
                return r?.setTimeout ? r.setTimeout(e, t, ...n) : setTimeout(e, t, ...n)
            }, clearTimeout(e) {
                const {delegate: t} = Kr;
                return (t?.clearTimeout || clearTimeout)(e)
            }, delegate: void 0
        };

        function sl(e) {
            Kr.setTimeout(() => {
                const {onUnhandledError: t} = Ut;
                if (!t) throw e;
                t(e)
            })
        }

        function al() {
        }

        const im = Mi("C", void 0, void 0);

        function Mi(e, t, n) {
            return {kind: e, value: t, error: n}
        }

        let Gt = null;

        function Jr(e) {
            if (Ut.useDeprecatedSynchronousErrorHandling) {
                const t = !Gt;
                if (t && (Gt = {errorThrown: !1, error: null}), e(), t) {
                    const {errorThrown: n, error: r} = Gt;
                    if (Gt = null, n) throw r
                }
            } else e()
        }

        class Ti extends ut {
            constructor(t) {
                super(), this.isStopped = !1, t ? (this.destination = t, ol(t) && t.add(this)) : this.destination = fm
            }

            static create(t, n, r) {
                return new nr(t, n, r)
            }

            next(t) {
                this.isStopped ? Ai(function am(e) {
                    return Mi("N", e, void 0)
                }(t), this) : this._next(t)
            }

            error(t) {
                this.isStopped ? Ai(function sm(e) {
                    return Mi("E", void 0, e)
                }(t), this) : (this.isStopped = !0, this._error(t))
            }

            complete() {
                this.isStopped ? Ai(im, this) : (this.isStopped = !0, this._complete())
            }

            unsubscribe() {
                this.closed || (this.isStopped = !0, super.unsubscribe(), this.destination = null)
            }

            _next(t) {
                this.destination.next(t)
            }

            _error(t) {
                try {
                    this.destination.error(t)
                } finally {
                    this.unsubscribe()
                }
            }

            _complete() {
                try {
                    this.destination.complete()
                } finally {
                    this.unsubscribe()
                }
            }
        }

        const lm = Function.prototype.bind;

        function Si(e, t) {
            return lm.call(e, t)
        }

        class cm {
            constructor(t) {
                this.partialObserver = t
            }

            next(t) {
                const {partialObserver: n} = this;
                if (n.next) try {
                    n.next(t)
                } catch (r) {
                    Xr(r)
                }
            }

            error(t) {
                const {partialObserver: n} = this;
                if (n.error) try {
                    n.error(t)
                } catch (r) {
                    Xr(r)
                } else Xr(t)
            }

            complete() {
                const {partialObserver: t} = this;
                if (t.complete) try {
                    t.complete()
                } catch (n) {
                    Xr(n)
                }
            }
        }

        class nr extends Ti {
            constructor(t, n, r) {
                let o;
                if (super(), te(t) || !t) o = {next: t ?? void 0, error: n ?? void 0, complete: r ?? void 0}; else {
                    let i;
                    this && Ut.useDeprecatedNextContext ? (i = Object.create(t), i.unsubscribe = () => this.unsubscribe(), o = {
                        next: t.next && Si(t.next, i),
                        error: t.error && Si(t.error, i),
                        complete: t.complete && Si(t.complete, i)
                    }) : o = t
                }
                this.destination = new cm(o)
            }
        }

        function Xr(e) {
            Ut.useDeprecatedSynchronousErrorHandling ? function um(e) {
                Ut.useDeprecatedSynchronousErrorHandling && Gt && (Gt.errorThrown = !0, Gt.error = e)
            }(e) : sl(e)
        }

        function Ai(e, t) {
            const {onStoppedNotification: n} = Ut;
            n && Kr.setTimeout(() => n(e, t))
        }

        const fm = {
            closed: !0, next: al, error: function dm(e) {
                throw e
            }, complete: al
        }, xi = "function" == typeof Symbol && Symbol.observable || "@@observable";

        function ul(e) {
            return e
        }

        let Se = (() => {
            class e {
                constructor(n) {
                    n && (this._subscribe = n)
                }

                lift(n) {
                    const r = new e;
                    return r.source = this, r.operator = n, r
                }

                subscribe(n, r, o) {
                    const i = function hm(e) {
                        return e && e instanceof Ti || function pm(e) {
                            return e && te(e.next) && te(e.error) && te(e.complete)
                        }(e) && ol(e)
                    }(n) ? n : new nr(n, r, o);
                    return Jr(() => {
                        const {operator: s, source: a} = this;
                        i.add(s ? s.call(i, a) : a ? this._subscribe(i) : this._trySubscribe(i))
                    }), i
                }

                _trySubscribe(n) {
                    try {
                        return this._subscribe(n)
                    } catch (r) {
                        n.error(r)
                    }
                }

                forEach(n, r) {
                    return new (r = cl(r))((o, i) => {
                        const s = new nr({
                            next: a => {
                                try {
                                    n(a)
                                } catch (u) {
                                    i(u), s.unsubscribe()
                                }
                            }, error: i, complete: o
                        });
                        this.subscribe(s)
                    })
                }

                _subscribe(n) {
                    var r;
                    return null === (r = this.source) || void 0 === r ? void 0 : r.subscribe(n)
                }

                [xi]() {
                    return this
                }

                pipe(...n) {
                    return function ll(e) {
                        return 0 === e.length ? ul : 1 === e.length ? e[0] : function (n) {
                            return e.reduce((r, o) => o(r), n)
                        }
                    }(n)(this)
                }

                toPromise(n) {
                    return new (n = cl(n))((r, o) => {
                        let i;
                        this.subscribe(s => i = s, s => o(s), () => r(i))
                    })
                }
            }

            return e.create = t => new e(t), e
        })();

        function cl(e) {
            var t;
            return null !== (t = e ?? Ut.Promise) && void 0 !== t ? t : Promise
        }

        const gm = Zr(e => function () {
            e(this), this.name = "ObjectUnsubscribedError", this.message = "object unsubscribed"
        });
        let Ni = (() => {
            class e extends Se {
                constructor() {
                    super(), this.closed = !1, this.currentObservers = null, this.observers = [], this.isStopped = !1, this.hasError = !1, this.thrownError = null
                }

                lift(n) {
                    const r = new dl(this, this);
                    return r.operator = n, r
                }

                _throwIfClosed() {
                    if (this.closed) throw new gm
                }

                next(n) {
                    Jr(() => {
                        if (this._throwIfClosed(), !this.isStopped) {
                            this.currentObservers || (this.currentObservers = Array.from(this.observers));
                            for (const r of this.currentObservers) r.next(n)
                        }
                    })
                }

                error(n) {
                    Jr(() => {
                        if (this._throwIfClosed(), !this.isStopped) {
                            this.hasError = this.isStopped = !0, this.thrownError = n;
                            const {observers: r} = this;
                            for (; r.length;) r.shift().error(n)
                        }
                    })
                }

                complete() {
                    Jr(() => {
                        if (this._throwIfClosed(), !this.isStopped) {
                            this.isStopped = !0;
                            const {observers: n} = this;
                            for (; n.length;) n.shift().complete()
                        }
                    })
                }

                unsubscribe() {
                    this.isStopped = this.closed = !0, this.observers = this.currentObservers = null
                }

                get observed() {
                    var n;
                    return (null === (n = this.observers) || void 0 === n ? void 0 : n.length) > 0
                }

                _trySubscribe(n) {
                    return this._throwIfClosed(), super._trySubscribe(n)
                }

                _subscribe(n) {
                    return this._throwIfClosed(), this._checkFinalizedStatuses(n), this._innerSubscribe(n)
                }

                _innerSubscribe(n) {
                    const {hasError: r, isStopped: o, observers: i} = this;
                    return r || o ? rl : (this.currentObservers = null, i.push(n), new ut(() => {
                        this.currentObservers = null, tr(i, n)
                    }))
                }

                _checkFinalizedStatuses(n) {
                    const {hasError: r, thrownError: o, isStopped: i} = this;
                    r ? n.error(o) : i && n.complete()
                }

                asObservable() {
                    const n = new Se;
                    return n.source = this, n
                }
            }

            return e.create = (t, n) => new dl(t, n), e
        })();

        class dl extends Ni {
            constructor(t, n) {
                super(), this.destination = t, this.source = n
            }

            next(t) {
                var n, r;
                null === (r = null === (n = this.destination) || void 0 === n ? void 0 : n.next) || void 0 === r || r.call(n, t)
            }

            error(t) {
                var n, r;
                null === (r = null === (n = this.destination) || void 0 === n ? void 0 : n.error) || void 0 === r || r.call(n, t)
            }

            complete() {
                var t, n;
                null === (n = null === (t = this.destination) || void 0 === t ? void 0 : t.complete) || void 0 === n || n.call(t)
            }

            _subscribe(t) {
                var n, r;
                return null !== (r = null === (n = this.source) || void 0 === n ? void 0 : n.subscribe(t)) && void 0 !== r ? r : rl
            }
        }

        function rr(e) {
            return t => {
                if (function mm(e) {
                    return te(e?.lift)
                }(t)) return t.lift(function (n) {
                    try {
                        return e(n, this)
                    } catch (r) {
                        this.error(r)
                    }
                });
                throw new TypeError("Unable to lift unknown Observable type")
            }
        }

        function eo(e, t, n, r, o) {
            return new ym(e, t, n, r, o)
        }

        class ym extends Ti {
            constructor(t, n, r, o, i, s) {
                super(t), this.onFinalize = i, this.shouldUnsubscribe = s, this._next = n ? function (a) {
                    try {
                        n(a)
                    } catch (u) {
                        t.error(u)
                    }
                } : super._next, this._error = o ? function (a) {
                    try {
                        o(a)
                    } catch (u) {
                        t.error(u)
                    } finally {
                        this.unsubscribe()
                    }
                } : super._error, this._complete = r ? function () {
                    try {
                        r()
                    } catch (a) {
                        t.error(a)
                    } finally {
                        this.unsubscribe()
                    }
                } : super._complete
            }

            unsubscribe() {
                var t;
                if (!this.shouldUnsubscribe || this.shouldUnsubscribe()) {
                    const {closed: n} = this;
                    super.unsubscribe(), !n && (null === (t = this.onFinalize) || void 0 === t || t.call(this))
                }
            }
        }

        function zt(e) {
            return this instanceof zt ? (this.v = e, this) : new zt(e)
        }

        function wm(e, t, n) {
            if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
            var o, r = n.apply(e, t || []), i = [];
            return o = {}, s("next"), s("throw"), s("return"), o[Symbol.asyncIterator] = function () {
                return this
            }, o;

            function s(f) {
                r[f] && (o[f] = function (p) {
                    return new Promise(function (h, g) {
                        i.push([f, p, h, g]) > 1 || a(f, p)
                    })
                })
            }

            function a(f, p) {
                try {
                    !function u(f) {
                        f.value instanceof zt ? Promise.resolve(f.value.v).then(l, c) : d(i[0][2], f)
                    }(r[f](p))
                } catch (h) {
                    d(i[0][3], h)
                }
            }

            function l(f) {
                a("next", f)
            }

            function c(f) {
                a("throw", f)
            }

            function d(f, p) {
                f(p), i.shift(), i.length && a(i[0][0], i[0][1])
            }
        }

        function Cm(e) {
            if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
            var n, t = e[Symbol.asyncIterator];
            return t ? t.call(e) : (e = function hl(e) {
                var t = "function" == typeof Symbol && Symbol.iterator, n = t && e[t], r = 0;
                if (n) return n.call(e);
                if (e && "number" == typeof e.length) return {
                    next: function () {
                        return e && r >= e.length && (e = void 0), {value: e && e[r++], done: !e}
                    }
                };
                throw new TypeError(t ? "Object is not iterable." : "Symbol.iterator is not defined.")
            }(e), n = {}, r("next"), r("throw"), r("return"), n[Symbol.asyncIterator] = function () {
                return this
            }, n);

            function r(i) {
                n[i] = e[i] && function (s) {
                    return new Promise(function (a, u) {
                        !function o(i, s, a, u) {
                            Promise.resolve(u).then(function (l) {
                                i({value: l, done: a})
                            }, s)
                        }(a, u, (s = e[i](s)).done, s.value)
                    })
                }
            }
        }

        const gl = e => e && "number" == typeof e.length && "function" != typeof e;

        function ml(e) {
            return te(e?.then)
        }

        function yl(e) {
            return te(e[xi])
        }

        function Dl(e) {
            return Symbol.asyncIterator && te(e?.[Symbol.asyncIterator])
        }

        function vl(e) {
            return new TypeError(`You provided ${null !== e && "object" == typeof e ? "an invalid object" : `'${e}'`} where a stream was expected. You can provide an Observable, Promise, ReadableStream, Array, AsyncIterable, or Iterable.`)
        }

        const _l = function bm() {
            return "function" == typeof Symbol && Symbol.iterator ? Symbol.iterator : "@@iterator"
        }();

        function wl(e) {
            return te(e?.[_l])
        }

        function Cl(e) {
            return wm(this, arguments, function* () {
                const n = e.getReader();
                try {
                    for (; ;) {
                        const {value: r, done: o} = yield zt(n.read());
                        if (o) return yield zt(void 0);
                        yield yield zt(r)
                    }
                } finally {
                    n.releaseLock()
                }
            })
        }

        function El(e) {
            return te(e?.getReader)
        }

        function qt(e) {
            if (e instanceof Se) return e;
            if (null != e) {
                if (yl(e)) return function Im(e) {
                    return new Se(t => {
                        const n = e[xi]();
                        if (te(n.subscribe)) return n.subscribe(t);
                        throw new TypeError("Provided object does not correctly implement Symbol.observable")
                    })
                }(e);
                if (gl(e)) return function Mm(e) {
                    return new Se(t => {
                        for (let n = 0; n < e.length && !t.closed; n++) t.next(e[n]);
                        t.complete()
                    })
                }(e);
                if (ml(e)) return function Tm(e) {
                    return new Se(t => {
                        e.then(n => {
                            t.closed || (t.next(n), t.complete())
                        }, n => t.error(n)).then(null, sl)
                    })
                }(e);
                if (Dl(e)) return bl(e);
                if (wl(e)) return function Sm(e) {
                    return new Se(t => {
                        for (const n of e) if (t.next(n), t.closed) return;
                        t.complete()
                    })
                }(e);
                if (El(e)) return function Am(e) {
                    return bl(Cl(e))
                }(e)
            }
            throw vl(e)
        }

        function bl(e) {
            return new Se(t => {
                (function xm(e, t) {
                    var n, r, o, i;
                    return function vm(e, t, n, r) {
                        return new (n || (n = Promise))(function (i, s) {
                            function a(c) {
                                try {
                                    l(r.next(c))
                                } catch (d) {
                                    s(d)
                                }
                            }

                            function u(c) {
                                try {
                                    l(r.throw(c))
                                } catch (d) {
                                    s(d)
                                }
                            }

                            function l(c) {
                                c.done ? i(c.value) : function o(i) {
                                    return i instanceof n ? i : new n(function (s) {
                                        s(i)
                                    })
                                }(c.value).then(a, u)
                            }

                            l((r = r.apply(e, t || [])).next())
                        })
                    }(this, void 0, void 0, function* () {
                        try {
                            for (n = Cm(e); !(r = yield n.next()).done;) if (t.next(r.value), t.closed) return
                        } catch (s) {
                            o = {error: s}
                        } finally {
                            try {
                                r && !r.done && (i = n.return) && (yield i.call(n))
                            } finally {
                                if (o) throw o.error
                            }
                        }
                        t.complete()
                    })
                })(e, t).catch(n => t.error(n))
            })
        }

        function Pt(e, t, n, r = 0, o = !1) {
            const i = t.schedule(function () {
                n(), o ? e.add(this.schedule(null, r)) : this.unsubscribe()
            }, r);
            if (e.add(i), !o) return i
        }

        function Il(e, t, n = 1 / 0) {
            return te(t) ? Il((r, o) => function Dm(e, t) {
                return rr((n, r) => {
                    let o = 0;
                    n.subscribe(eo(r, i => {
                        r.next(e.call(t, i, o++))
                    }))
                })
            }((i, s) => t(r, i, o, s))(qt(e(r, o))), n) : ("number" == typeof t && (n = t), rr((r, o) => function Nm(e, t, n, r, o, i, s, a) {
                const u = [];
                let l = 0, c = 0, d = !1;
                const f = () => {
                    d && !u.length && !l && t.complete()
                }, p = g => l < r ? h(g) : u.push(g), h = g => {
                    i && t.next(g), l++;
                    let D = !1;
                    qt(n(g, c++)).subscribe(eo(t, v => {
                        o?.(v), i ? p(v) : t.next(v)
                    }, () => {
                        D = !0
                    }, void 0, () => {
                        if (D) try {
                            for (l--; u.length && l < r;) {
                                const v = u.shift();
                                s ? Pt(t, s, () => h(v)) : h(v)
                            }
                            f()
                        } catch (v) {
                            t.error(v)
                        }
                    }))
                };
                return e.subscribe(eo(t, p, () => {
                    d = !0, f()
                })), () => {
                    a?.()
                }
            }(r, o, e, n)))
        }

        const Ml = new Se(e => e.complete());

        function Pi(e) {
            return e[e.length - 1]
        }

        function Tl(e, t = 0) {
            return rr((n, r) => {
                n.subscribe(eo(r, o => Pt(r, e, () => r.next(o), t), () => Pt(r, e, () => r.complete(), t), o => Pt(r, e, () => r.error(o), t)))
            })
        }

        function Sl(e, t = 0) {
            return rr((n, r) => {
                r.add(e.schedule(() => n.subscribe(r), t))
            })
        }

        function Al(e, t) {
            if (!e) throw new Error("Iterable cannot be null");
            return new Se(n => {
                Pt(n, t, () => {
                    const r = e[Symbol.asyncIterator]();
                    Pt(n, t, () => {
                        r.next().then(o => {
                            o.done ? n.complete() : n.next(o.value)
                        })
                    }, 0, !0)
                })
            })
        }

        function Gm(...e) {
            const t = function Rm(e) {
                return function Om(e) {
                    return e && te(e.schedule)
                }(Pi(e)) ? e.pop() : void 0
            }(e), n = function Lm(e, t) {
                return "number" == typeof Pi(e) ? e.pop() : t
            }(e, 1 / 0), r = e;
            return r.length ? 1 === r.length ? qt(r[0]) : function Fm(e = 1 / 0) {
                return Il(ul, e)
            }(n)(function Um(e, t) {
                return t ? function $m(e, t) {
                    if (null != e) {
                        if (yl(e)) return function km(e, t) {
                            return qt(e).pipe(Sl(t), Tl(t))
                        }(e, t);
                        if (gl(e)) return function jm(e, t) {
                            return new Se(n => {
                                let r = 0;
                                return t.schedule(function () {
                                    r === e.length ? n.complete() : (n.next(e[r++]), n.closed || this.schedule())
                                })
                            })
                        }(e, t);
                        if (ml(e)) return function Vm(e, t) {
                            return qt(e).pipe(Sl(t), Tl(t))
                        }(e, t);
                        if (Dl(e)) return Al(e, t);
                        if (wl(e)) return function Bm(e, t) {
                            return new Se(n => {
                                let r;
                                return Pt(n, t, () => {
                                    r = e[_l](), Pt(n, t, () => {
                                        let o, i;
                                        try {
                                            ({value: o, done: i} = r.next())
                                        } catch (s) {
                                            return void n.error(s)
                                        }
                                        i ? n.complete() : n.next(o)
                                    }, 0, !0)
                                }), () => te(r?.return) && r.return()
                            })
                        }(e, t);
                        if (El(e)) return function Hm(e, t) {
                            return Al(Cl(e), t)
                        }(e, t)
                    }
                    throw vl(e)
                }(e, t) : qt(e)
            }(r, t)) : Ml
        }

        function Oi(e, t, ...n) {
            if (!0 === t) return void e();
            if (!1 === t) return;
            const r = new nr({
                next: () => {
                    r.unsubscribe(), e()
                }
            });
            return t(...n).subscribe(r)
        }

        function q(e) {
            for (let t in e) if (e[t] === q) return t;
            throw Error("Could not find renamed property on target object.")
        }

        function W(e) {
            if ("string" == typeof e) return e;
            if (Array.isArray(e)) return "[" + e.map(W).join(", ") + "]";
            if (null == e) return "" + e;
            if (e.overriddenName) return `${e.overriddenName}`;
            if (e.name) return `${e.name}`;
            const t = e.toString();
            if (null == t) return "" + t;
            const n = t.indexOf("\n");
            return -1 === n ? t : t.substring(0, n)
        }

        function Li(e, t) {
            return null == e || "" === e ? null === t ? "" : t : null == t || "" === t ? e : e + " " + t
        }

        const qm = q({__forward_ref__: q});

        function ki(e) {
            return e.__forward_ref__ = ki, e.toString = function () {
                return W(this())
            }, e
        }

        function M(e) {
            return function Vi(e) {
                return "function" == typeof e && e.hasOwnProperty(qm) && e.__forward_ref__ === ki
            }(e) ? e() : e
        }

        class T extends Error {
            constructor(t, n) {
                super(function to(e, t) {
                    return `NG0${Math.abs(e)}${t ? ": " + t.trim() : ""}`
                }(t, n)), this.code = t
            }
        }

        function x(e) {
            return "string" == typeof e ? e : null == e ? "" : String(e)
        }

        function no(e, t) {
            throw new T(-201, !1)
        }

        function Re(e, t) {
            null == e && function $(e, t, n, r) {
                throw new Error(`ASSERTION ERROR: ${e}` + (null == r ? "" : ` [Expected=> ${n} ${r} ${t} <=Actual]`))
            }(t, e, null, "!=")
        }

        function K(e) {
            return {token: e.token, providedIn: e.providedIn || null, factory: e.factory, value: void 0}
        }

        function un(e) {
            return {providers: e.providers || [], imports: e.imports || []}
        }

        function ji(e) {
            return xl(e, ro) || xl(e, Fl)
        }

        function xl(e, t) {
            return e.hasOwnProperty(t) ? e[t] : null
        }

        function Nl(e) {
            return e && (e.hasOwnProperty(Bi) || e.hasOwnProperty(ey)) ? e[Bi] : null
        }

        const ro = q({\u0275prov: q}), Bi = q({\u0275inj: q}), Fl = q({ngInjectableDef: q}), ey = q({ngInjectorDef: q});
        var S = (() => ((S = S || {})[S.Default = 0] = "Default", S[S.Host = 1] = "Host", S[S.Self = 2] = "Self", S[S.SkipSelf = 4] = "SkipSelf", S[S.Optional = 8] = "Optional", S))();
        let Hi;

        function Ue(e) {
            const t = Hi;
            return Hi = e, t
        }

        function Pl(e, t, n) {
            const r = ji(e);
            return r && "root" == r.providedIn ? void 0 === r.value ? r.value = r.factory() : r.value : n & S.Optional ? null : void 0 !== t ? t : void no(W(e))
        }

        function Ot(e) {
            return {toString: e}.toString()
        }

        var Ke = (() => ((Ke = Ke || {})[Ke.OnPush = 0] = "OnPush", Ke[Ke.Default = 1] = "Default", Ke))(),
            lt = (() => {
                return (e = lt || (lt = {}))[e.Emulated = 0] = "Emulated", e[e.None = 2] = "None", e[e.ShadowDom = 3] = "ShadowDom", lt;
                var e
            })();
        const z = (() => typeof globalThis < "u" && globalThis || typeof global < "u" && global || typeof window < "u" && window || typeof self < "u" && typeof WorkerGlobalScope < "u" && self instanceof WorkerGlobalScope && self)(),
            ln = {}, H = [], oo = q({\u0275cmp: q}), $i = q({\u0275dir: q}), Ui = q({\u0275pipe: q}),
            Ol = q({\u0275mod: q}), _t = q({\u0275fac: q}), or = q({__NG_ELEMENT_ID__: q});
        let ny = 0;

        function io(e) {
            return Ot(() => {
                const n = !0 === e.standalone, r = {}, o = {
                    type: e.type,
                    providersResolver: null,
                    decls: e.decls,
                    vars: e.vars,
                    factory: null,
                    template: e.template || null,
                    consts: e.consts || null,
                    ngContentSelectors: e.ngContentSelectors,
                    hostBindings: e.hostBindings || null,
                    hostVars: e.hostVars || 0,
                    hostAttrs: e.hostAttrs || null,
                    contentQueries: e.contentQueries || null,
                    declaredInputs: r,
                    inputs: null,
                    outputs: null,
                    exportAs: e.exportAs || null,
                    onPush: e.changeDetection === Ke.OnPush,
                    directiveDefs: null,
                    pipeDefs: null,
                    standalone: n,
                    dependencies: n && e.dependencies || null,
                    getStandaloneInjector: null,
                    selectors: e.selectors || H,
                    viewQuery: e.viewQuery || null,
                    features: e.features || null,
                    data: e.data || {},
                    encapsulation: e.encapsulation || lt.Emulated,
                    id: "c" + ny++,
                    styles: e.styles || H,
                    _: null,
                    setInput: null,
                    schemas: e.schemas || null,
                    tView: null
                }, i = e.dependencies, s = e.features;
                return o.inputs = kl(e.inputs, r), o.outputs = kl(e.outputs), s && s.forEach(a => a(o)), o.directiveDefs = i ? () => ("function" == typeof i ? i() : i).map(Rl).filter(Ll) : null, o.pipeDefs = i ? () => ("function" == typeof i ? i() : i).map(Ce).filter(Ll) : null, o
            })
        }

        function Rl(e) {
            return G(e) || we(e)
        }

        function Ll(e) {
            return null !== e
        }

        const oy = {};

        function ir(e) {
            return Ot(() => {
                const t = {
                    type: e.type,
                    bootstrap: e.bootstrap || H,
                    declarations: e.declarations || H,
                    imports: e.imports || H,
                    exports: e.exports || H,
                    transitiveCompileScopes: null,
                    schemas: e.schemas || null,
                    id: e.id || null
                };
                return null != e.id && (oy[e.id] = e.type), t
            })
        }

        function kl(e, t) {
            if (null == e) return ln;
            const n = {};
            for (const r in e) if (e.hasOwnProperty(r)) {
                let o = e[r], i = o;
                Array.isArray(o) && (i = o[1], o = o[0]), n[o] = r, t && (t[o] = i)
            }
            return n
        }

        const Ge = io;

        function Ae(e) {
            return {
                type: e.type,
                name: e.name,
                factory: null,
                pure: !1 !== e.pure,
                standalone: !0 === e.standalone,
                onDestroy: e.type.prototype.ngOnDestroy || null
            }
        }

        function G(e) {
            return e[oo] || null
        }

        function we(e) {
            return e[$i] || null
        }

        function Ce(e) {
            return e[Ui] || null
        }

        const O = 11, Q = 22;

        function xe(e) {
            return Array.isArray(e) && "object" == typeof e[1]
        }

        function Xe(e) {
            return Array.isArray(e) && !0 === e[1]
        }

        function qi(e) {
            return 0 != (8 & e.flags)
        }

        function lo(e) {
            return 2 == (2 & e.flags)
        }

        function co(e) {
            return 1 == (1 & e.flags)
        }

        function et(e) {
            return null !== e.template
        }

        function ly(e) {
            return 0 != (256 & e[2])
        }

        function Kt(e, t) {
            return e.hasOwnProperty(_t) ? e[_t] : null
        }

        class fy {
            constructor(t, n, r) {
                this.previousValue = t, this.currentValue = n, this.firstChange = r
            }

            isFirstChange() {
                return this.firstChange
            }
        }

        function Bl(e) {
            return e.type.prototype.ngOnChanges && (e.setInput = hy), py
        }

        function py() {
            const e = $l(this), t = e?.current;
            if (t) {
                const n = e.previous;
                if (n === ln) e.previous = t; else for (let r in t) n[r] = t[r];
                e.current = null, this.ngOnChanges(t)
            }
        }

        function hy(e, t, n, r) {
            const o = $l(e) || function gy(e, t) {
                    return e[Hl] = t
                }(e, {previous: ln, current: null}), i = o.current || (o.current = {}), s = o.previous,
                a = this.declaredInputs[n], u = s[a];
            i[a] = new fy(u && u.currentValue, t, s === ln), e[r] = t
        }

        const Hl = "__ngSimpleChanges__";

        function $l(e) {
            return e[Hl] || null
        }

        function ae(e) {
            for (; Array.isArray(e);) e = e[0];
            return e
        }

        function We(e, t) {
            return ae(t[e.index])
        }

        function Ki(e, t) {
            return e.data[t]
        }

        function hn(e, t) {
            return e[t]
        }

        function Ve(e, t) {
            const n = t[e];
            return xe(n) ? n : n[0]
        }

        function Ji(e) {
            return 64 == (64 & e[2])
        }

        function Rt(e, t) {
            return null == t ? null : e[t]
        }

        function Gl(e) {
            e[18] = 0
        }

        function Xi(e, t) {
            e[5] += t;
            let n = e, r = e[3];
            for (; null !== r && (1 === t && 1 === n[5] || -1 === t && 0 === n[5]);) r[5] += t, n = r, r = r[3]
        }

        const A = {lFrame: Xl(null), bindingsEnabled: !0};

        function ql() {
            return A.bindingsEnabled
        }

        function y() {
            return A.lFrame.lView
        }

        function j() {
            return A.lFrame.tView
        }

        function es(e) {
            return A.lFrame.contextLView = e, e[8]
        }

        function ts(e) {
            return A.lFrame.contextLView = null, e
        }

        function de() {
            let e = Wl();
            for (; null !== e && 64 === e.type;) e = e.parent;
            return e
        }

        function Wl() {
            return A.lFrame.currentTNode
        }

        function ct(e, t) {
            const n = A.lFrame;
            n.currentTNode = e, n.isParent = t
        }

        function ns() {
            return A.lFrame.isParent
        }

        function gn() {
            return A.lFrame.bindingIndex++
        }

        function Ay(e, t) {
            const n = A.lFrame;
            n.bindingIndex = n.bindingRootIndex = e, os(t)
        }

        function os(e) {
            A.lFrame.currentDirectiveIndex = e
        }

        function ss(e) {
            A.lFrame.currentQueryIndex = e
        }

        function Ny(e) {
            const t = e[1];
            return 2 === t.type ? t.declTNode : 1 === t.type ? e[6] : null
        }

        function Kl(e, t, n) {
            if (n & S.SkipSelf) {
                let o = t, i = e;
                for (; !(o = o.parent, null !== o || n & S.Host || (o = Ny(i), null === o || (i = i[15], 10 & o.type)));) ;
                if (null === o) return !1;
                t = o, e = i
            }
            const r = A.lFrame = Jl();
            return r.currentTNode = t, r.lView = e, !0
        }

        function as(e) {
            const t = Jl(), n = e[1];
            A.lFrame = t, t.currentTNode = n.firstChild, t.lView = e, t.tView = n, t.contextLView = e, t.bindingIndex = n.bindingStartIndex, t.inI18n = !1
        }

        function Jl() {
            const e = A.lFrame, t = null === e ? null : e.child;
            return null === t ? Xl(e) : t
        }

        function Xl(e) {
            const t = {
                currentTNode: null,
                isParent: !0,
                lView: null,
                tView: null,
                selectedIndex: -1,
                contextLView: null,
                elementDepthCount: 0,
                currentNamespace: null,
                currentDirectiveIndex: -1,
                bindingRootIndex: -1,
                bindingIndex: -1,
                currentQueryIndex: 0,
                parent: e,
                child: null,
                inI18n: !1
            };
            return null !== e && (e.child = t), t
        }

        function ec() {
            const e = A.lFrame;
            return A.lFrame = e.parent, e.currentTNode = null, e.lView = null, e
        }

        const tc = ec;

        function us() {
            const e = ec();
            e.isParent = !0, e.tView = null, e.selectedIndex = -1, e.contextLView = null, e.elementDepthCount = 0, e.currentDirectiveIndex = -1, e.currentNamespace = null, e.bindingRootIndex = -1, e.bindingIndex = -1, e.currentQueryIndex = 0
        }

        function be() {
            return A.lFrame.selectedIndex
        }

        function Lt(e) {
            A.lFrame.selectedIndex = e
        }

        function go(e, t) {
            for (let n = t.directiveStart, r = t.directiveEnd; n < r; n++) {
                const i = e.data[n].type.prototype, {
                    ngAfterContentInit: s,
                    ngAfterContentChecked: a,
                    ngAfterViewInit: u,
                    ngAfterViewChecked: l,
                    ngOnDestroy: c
                } = i;
                s && (e.contentHooks || (e.contentHooks = [])).push(-n, s), a && ((e.contentHooks || (e.contentHooks = [])).push(n, a), (e.contentCheckHooks || (e.contentCheckHooks = [])).push(n, a)), u && (e.viewHooks || (e.viewHooks = [])).push(-n, u), l && ((e.viewHooks || (e.viewHooks = [])).push(n, l), (e.viewCheckHooks || (e.viewCheckHooks = [])).push(n, l)), null != c && (e.destroyHooks || (e.destroyHooks = [])).push(n, c)
            }
        }

        function mo(e, t, n) {
            nc(e, t, 3, n)
        }

        function yo(e, t, n, r) {
            (3 & e[2]) === n && nc(e, t, n, r)
        }

        function ls(e, t) {
            let n = e[2];
            (3 & n) === t && (n &= 2047, n += 1, e[2] = n)
        }

        function nc(e, t, n, r) {
            const i = r ?? -1, s = t.length - 1;
            let a = 0;
            for (let u = void 0 !== r ? 65535 & e[18] : 0; u < s; u++) if ("number" == typeof t[u + 1]) {
                if (a = t[u], null != r && a >= r) break
            } else t[u] < 0 && (e[18] += 65536), (a < i || -1 == i) && (By(e, n, t, u), e[18] = (4294901760 & e[18]) + u + 2), u++
        }

        function By(e, t, n, r) {
            const o = n[r] < 0, i = n[r + 1], a = e[o ? -n[r] : n[r]];
            if (o) {
                if (e[2] >> 11 < e[18] >> 16 && (3 & e[2]) === t) {
                    e[2] += 2048;
                    try {
                        i.call(a)
                    } finally {
                    }
                }
            } else try {
                i.call(a)
            } finally {
            }
        }

        class cr {
            constructor(t, n, r) {
                this.factory = t, this.resolving = !1, this.canSeeViewProviders = n, this.injectImpl = r
            }
        }

        function Do(e, t, n) {
            let r = 0;
            for (; r < n.length;) {
                const o = n[r];
                if ("number" == typeof o) {
                    if (0 !== o) break;
                    r++;
                    const i = n[r++], s = n[r++], a = n[r++];
                    e.setAttribute(t, s, a, i)
                } else {
                    const i = o, s = n[++r];
                    oc(i) ? e.setProperty(t, i, s) : e.setAttribute(t, i, s), r++
                }
            }
            return r
        }

        function rc(e) {
            return 3 === e || 4 === e || 6 === e
        }

        function oc(e) {
            return 64 === e.charCodeAt(0)
        }

        function vo(e, t) {
            if (null !== t && 0 !== t.length) if (null === e || 0 === e.length) e = t.slice(); else {
                let n = -1;
                for (let r = 0; r < t.length; r++) {
                    const o = t[r];
                    "number" == typeof o ? n = o : 0 === n || ic(e, n, o, null, -1 === n || 2 === n ? t[++r] : null)
                }
            }
            return e
        }

        function ic(e, t, n, r, o) {
            let i = 0, s = e.length;
            if (-1 === t) s = -1; else for (; i < e.length;) {
                const a = e[i++];
                if ("number" == typeof a) {
                    if (a === t) {
                        s = -1;
                        break
                    }
                    if (a > t) {
                        s = i - 1;
                        break
                    }
                }
            }
            for (; i < e.length;) {
                const a = e[i];
                if ("number" == typeof a) break;
                if (a === n) {
                    if (null === r) return void (null !== o && (e[i + 1] = o));
                    if (r === e[i + 1]) return void (e[i + 2] = o)
                }
                i++, null !== r && i++, null !== o && i++
            }
            -1 !== s && (e.splice(s, 0, t), i = s + 1), e.splice(i++, 0, n), null !== r && e.splice(i++, 0, r), null !== o && e.splice(i++, 0, o)
        }

        function sc(e) {
            return -1 !== e
        }

        function mn(e) {
            return 32767 & e
        }

        function yn(e, t) {
            let n = function zy(e) {
                return e >> 16
            }(e), r = t;
            for (; n > 0;) r = r[15], n--;
            return r
        }

        let ds = !0;

        function _o(e) {
            const t = ds;
            return ds = e, t
        }

        let qy = 0;
        const dt = {};

        function fr(e, t) {
            const n = ps(e, t);
            if (-1 !== n) return n;
            const r = t[1];
            r.firstCreatePass && (e.injectorIndex = t.length, fs(r.data, e), fs(t, null), fs(r.blueprint, null));
            const o = wo(e, t), i = e.injectorIndex;
            if (sc(o)) {
                const s = mn(o), a = yn(o, t), u = a[1].data;
                for (let l = 0; l < 8; l++) t[i + l] = a[s + l] | u[s + l]
            }
            return t[i + 8] = o, i
        }

        function fs(e, t) {
            e.push(0, 0, 0, 0, 0, 0, 0, 0, t)
        }

        function ps(e, t) {
            return -1 === e.injectorIndex || e.parent && e.parent.injectorIndex === e.injectorIndex || null === t[e.injectorIndex + 8] ? -1 : e.injectorIndex
        }

        function wo(e, t) {
            if (e.parent && -1 !== e.parent.injectorIndex) return e.parent.injectorIndex;
            let n = 0, r = null, o = t;
            for (; null !== o;) {
                if (r = gc(o), null === r) return -1;
                if (n++, o = o[15], -1 !== r.injectorIndex) return r.injectorIndex | n << 16
            }
            return -1
        }

        function Co(e, t, n) {
            !function Wy(e, t, n) {
                let r;
                "string" == typeof n ? r = n.charCodeAt(0) || 0 : n.hasOwnProperty(or) && (r = n[or]), null == r && (r = n[or] = qy++);
                const o = 255 & r;
                t.data[e + (o >> 5)] |= 1 << o
            }(e, t, n)
        }

        function lc(e, t, n) {
            if (n & S.Optional) return e;
            no()
        }

        function cc(e, t, n, r) {
            if (n & S.Optional && void 0 === r && (r = null), 0 == (n & (S.Self | S.Host))) {
                const o = e[9], i = Ue(void 0);
                try {
                    return o ? o.get(t, r, n & S.Optional) : Pl(t, r, n & S.Optional)
                } finally {
                    Ue(i)
                }
            }
            return lc(r, 0, n)
        }

        function dc(e, t, n, r = S.Default, o) {
            if (null !== e) {
                if (1024 & t[2]) {
                    const s = function Xy(e, t, n, r, o) {
                        let i = e, s = t;
                        for (; null !== i && null !== s && 1024 & s[2] && !(256 & s[2]);) {
                            const a = fc(i, s, n, r | S.Self, dt);
                            if (a !== dt) return a;
                            let u = i.parent;
                            if (!u) {
                                const l = s[21];
                                if (l) {
                                    const c = l.get(n, dt, r);
                                    if (c !== dt) return c
                                }
                                u = gc(s), s = s[15]
                            }
                            i = u
                        }
                        return o
                    }(e, t, n, r, dt);
                    if (s !== dt) return s
                }
                const i = fc(e, t, n, r, dt);
                if (i !== dt) return i
            }
            return cc(t, n, r, o)
        }

        function fc(e, t, n, r, o) {
            const i = function Yy(e) {
                if ("string" == typeof e) return e.charCodeAt(0) || 0;
                const t = e.hasOwnProperty(or) ? e[or] : void 0;
                return "number" == typeof t ? t >= 0 ? 255 & t : Ky : t
            }(n);
            if ("function" == typeof i) {
                if (!Kl(t, e, r)) return r & S.Host ? lc(o, 0, r) : cc(t, n, r, o);
                try {
                    const s = i(r);
                    if (null != s || r & S.Optional) return s;
                    no()
                } finally {
                    tc()
                }
            } else if ("number" == typeof i) {
                let s = null, a = ps(e, t), u = -1, l = r & S.Host ? t[16][6] : null;
                for ((-1 === a || r & S.SkipSelf) && (u = -1 === a ? wo(e, t) : t[a + 8], -1 !== u && hc(r, !1) ? (s = t[1], a = mn(u), t = yn(u, t)) : a = -1); -1 !== a;) {
                    const c = t[1];
                    if (pc(i, a, c.data)) {
                        const d = Zy(a, t, n, s, r, l);
                        if (d !== dt) return d
                    }
                    u = t[a + 8], -1 !== u && hc(r, t[1].data[a + 8] === l) && pc(i, a, t) ? (s = c, a = mn(u), t = yn(u, t)) : a = -1
                }
            }
            return o
        }

        function Zy(e, t, n, r, o, i) {
            const s = t[1], a = s.data[e + 8], c = function Eo(e, t, n, r, o) {
                const i = e.providerIndexes, s = t.data, a = 1048575 & i, u = e.directiveStart, c = i >> 20,
                    f = o ? a + c : e.directiveEnd;
                for (let p = r ? a : a + c; p < f; p++) {
                    const h = s[p];
                    if (p < u && n === h || p >= u && h.type === n) return p
                }
                if (o) {
                    const p = s[u];
                    if (p && et(p) && p.type === n) return u
                }
                return null
            }(a, s, n, null == r ? lo(a) && ds : r != s && 0 != (3 & a.type), o & S.Host && i === a);
            return null !== c ? pr(t, s, c, a) : dt
        }

        function pr(e, t, n, r) {
            let o = e[n];
            const i = t.data;
            if (function Hy(e) {
                return e instanceof cr
            }(o)) {
                const s = o;
                s.resolving && function Wm(e, t) {
                    const n = t ? `. Dependency path: ${t.join(" > ")} > ${e}` : "";
                    throw new T(-200, `Circular dependency in DI detected for ${e}${n}`)
                }(function B(e) {
                    return "function" == typeof e ? e.name || e.toString() : "object" == typeof e && null != e && "function" == typeof e.type ? e.type.name || e.type.toString() : x(e)
                }(i[n]));
                const a = _o(s.canSeeViewProviders);
                s.resolving = !0;
                const u = s.injectImpl ? Ue(s.injectImpl) : null;
                Kl(e, r, S.Default);
                try {
                    o = e[n] = s.factory(void 0, i, e, r), t.firstCreatePass && n >= r.directiveStart && function jy(e, t, n) {
                        const {ngOnChanges: r, ngOnInit: o, ngDoCheck: i} = t.type.prototype;
                        if (r) {
                            const s = Bl(t);
                            (n.preOrderHooks || (n.preOrderHooks = [])).push(e, s), (n.preOrderCheckHooks || (n.preOrderCheckHooks = [])).push(e, s)
                        }
                        o && (n.preOrderHooks || (n.preOrderHooks = [])).push(0 - e, o), i && ((n.preOrderHooks || (n.preOrderHooks = [])).push(e, i), (n.preOrderCheckHooks || (n.preOrderCheckHooks = [])).push(e, i))
                    }(n, i[n], t)
                } finally {
                    null !== u && Ue(u), _o(a), s.resolving = !1, tc()
                }
            }
            return o
        }

        function pc(e, t, n) {
            return !!(n[t + (e >> 5)] & 1 << e)
        }

        function hc(e, t) {
            return !(e & S.Self || e & S.Host && t)
        }

        class Dn {
            constructor(t, n) {
                this._tNode = t, this._lView = n
            }

            get(t, n, r) {
                return dc(this._tNode, this._lView, t, r, n)
            }
        }

        function Ky() {
            return new Dn(de(), y())
        }

        function gc(e) {
            const t = e[1], n = t.type;
            return 2 === n ? t.declTNode : 1 === n ? e[6] : null
        }

        const _n = "__parameters__";

        function Cn(e, t, n) {
            return Ot(() => {
                const r = function ms(e) {
                    return function (...n) {
                        if (e) {
                            const r = e(...n);
                            for (const o in r) this[o] = r[o]
                        }
                    }
                }(t);

                function o(...i) {
                    if (this instanceof o) return r.apply(this, i), this;
                    const s = new o(...i);
                    return a.annotation = s, a;

                    function a(u, l, c) {
                        const d = u.hasOwnProperty(_n) ? u[_n] : Object.defineProperty(u, _n, {value: []})[_n];
                        for (; d.length <= c;) d.push(null);
                        return (d[c] = d[c] || []).push(s), u
                    }
                }

                return n && (o.prototype = Object.create(n.prototype)), o.prototype.ngMetadataName = e, o.annotationCls = o, o
            })
        }

        class V {
            constructor(t, n) {
                this._desc = t, this.ngMetadataName = "InjectionToken", this.\u0275prov = void 0, "number" == typeof n ? this.__NG_ELEMENT_ID__ = n : void 0 !== n && (this.\u0275prov = K({
                    token: this,
                    providedIn: n.providedIn || "root",
                    factory: n.factory
                }))
            }

            get multi() {
                return this
            }

            toString() {
                return `InjectionToken ${this._desc}`
            }
        }

        function Et(e, t) {
            e.forEach(n => Array.isArray(n) ? Et(n, t) : t(n))
        }

        function yc(e, t, n) {
            t >= e.length ? e.push(n) : e.splice(t, 0, n)
        }

        function bo(e, t) {
            return t >= e.length - 1 ? e.pop() : e.splice(t, 1)[0]
        }

        const yr = {}, _s = "__NG_DI_FLAG__", Mo = "ngTempTokenPath", dD = /\n/gm, wc = "__source";
        let Dr;

        function bn(e) {
            const t = Dr;
            return Dr = e, t
        }

        function pD(e, t = S.Default) {
            if (void 0 === Dr) throw new T(-203, !1);
            return null === Dr ? Pl(e, void 0, t) : Dr.get(e, t & S.Optional ? null : void 0, t)
        }

        function U(e, t = S.Default) {
            return (function ty() {
                return Hi
            }() || pD)(M(e), t)
        }

        function ws(e) {
            const t = [];
            for (let n = 0; n < e.length; n++) {
                const r = M(e[n]);
                if (Array.isArray(r)) {
                    if (0 === r.length) throw new T(900, !1);
                    let o, i = S.Default;
                    for (let s = 0; s < r.length; s++) {
                        const a = r[s], u = gD(a);
                        "number" == typeof u ? -1 === u ? o = a.token : i |= u : o = a
                    }
                    t.push(U(o, i))
                } else t.push(U(r))
            }
            return t
        }

        function vr(e, t) {
            return e[_s] = t, e.prototype[_s] = t, e
        }

        function gD(e) {
            return e[_s]
        }

        const To = vr(Cn("Optional"), 8), So = vr(Cn("SkipSelf"), 4);
        let Es;
        const Gc = new V("ENVIRONMENT_INITIALIZER"), zc = new V("INJECTOR", -1), qc = new V("INJECTOR_DEF_TYPES");

        class Wc {
            get(t, n = yr) {
                if (n === yr) {
                    const r = new Error(`NullInjectorError: No provider for ${W(t)}!`);
                    throw r.name = "NullInjectorError", r
                }
                return n
            }
        }

        function ev(...e) {
            return {\u0275providers: Qc(0, e)}
        }

        function Qc(e, ...t) {
            const n = [], r = new Set;
            let o;
            return Et(t, i => {
                const s = i;
                xs(s, n, [], r) && (o || (o = []), o.push(s))
            }), void 0 !== o && Zc(o, n), n
        }

        function Zc(e, t) {
            for (let n = 0; n < e.length; n++) {
                const {providers: o} = e[n];
                Et(o, i => {
                    t.push(i)
                })
            }
        }

        function xs(e, t, n, r) {
            if (!(e = M(e))) return !1;
            let o = null, i = Nl(e);
            const s = !i && G(e);
            if (i || s) {
                if (s && !s.standalone) return !1;
                o = e
            } else {
                const u = e.ngModule;
                if (i = Nl(u), !i) return !1;
                o = u
            }
            const a = r.has(o);
            if (s) {
                if (a) return !1;
                if (r.add(o), s.dependencies) {
                    const u = "function" == typeof s.dependencies ? s.dependencies() : s.dependencies;
                    for (const l of u) xs(l, t, n, r)
                }
            } else {
                if (!i) return !1;
                {
                    if (null != i.imports && !a) {
                        let l;
                        r.add(o);
                        try {
                            Et(i.imports, c => {
                                xs(c, t, n, r) && (l || (l = []), l.push(c))
                            })
                        } finally {
                        }
                        void 0 !== l && Zc(l, t)
                    }
                    if (!a) {
                        const l = Kt(o) || (() => new o);
                        t.push({provide: o, useFactory: l, deps: H}, {
                            provide: qc,
                            useValue: o,
                            multi: !0
                        }, {provide: Gc, useValue: () => U(o), multi: !0})
                    }
                    const u = i.providers;
                    null == u || a || Et(u, c => {
                        t.push(c)
                    })
                }
            }
            return o !== e && void 0 !== e.providers
        }

        const tv = q({provide: String, useValue: q});

        function Ns(e) {
            return null !== e && "object" == typeof e && tv in e
        }

        function Jt(e) {
            return "function" == typeof e
        }

        const Fs = new V("Set Injector scope."), Ro = {}, rv = {};
        let Ps;

        function Lo() {
            return void 0 === Ps && (Ps = new Wc), Ps
        }

        class Tn {
        }

        class Jc extends Tn {
            constructor(t, n, r, o) {
                super(), this.parent = n, this.source = r, this.scopes = o, this.records = new Map, this._ngOnDestroyHooks = new Set, this._onDestroyHooks = [], this._destroyed = !1, Rs(t, s => this.processProvider(s)), this.records.set(zc, Sn(void 0, this)), o.has("environment") && this.records.set(Tn, Sn(void 0, this));
                const i = this.records.get(Fs);
                null != i && "string" == typeof i.value && this.scopes.add(i.value), this.injectorDefTypes = new Set(this.get(qc.multi, H, S.Self))
            }

            get destroyed() {
                return this._destroyed
            }

            destroy() {
                this.assertNotDestroyed(), this._destroyed = !0;
                try {
                    for (const t of this._ngOnDestroyHooks) t.ngOnDestroy();
                    for (const t of this._onDestroyHooks) t()
                } finally {
                    this.records.clear(), this._ngOnDestroyHooks.clear(), this.injectorDefTypes.clear(), this._onDestroyHooks.length = 0
                }
            }

            onDestroy(t) {
                this._onDestroyHooks.push(t)
            }

            runInContext(t) {
                this.assertNotDestroyed();
                const n = bn(this), r = Ue(void 0);
                try {
                    return t()
                } finally {
                    bn(n), Ue(r)
                }
            }

            get(t, n = yr, r = S.Default) {
                this.assertNotDestroyed();
                const o = bn(this), i = Ue(void 0);
                try {
                    if (!(r & S.SkipSelf)) {
                        let a = this.records.get(t);
                        if (void 0 === a) {
                            const u = function uv(e) {
                                return "function" == typeof e || "object" == typeof e && e instanceof V
                            }(t) && ji(t);
                            a = u && this.injectableDefInScope(u) ? Sn(Os(t), Ro) : null, this.records.set(t, a)
                        }
                        if (null != a) return this.hydrate(t, a)
                    }
                    return (r & S.Self ? Lo() : this.parent).get(t, n = r & S.Optional && n === yr ? null : n)
                } catch (s) {
                    if ("NullInjectorError" === s.name) {
                        if ((s[Mo] = s[Mo] || []).unshift(W(t)), o) throw s;
                        return function mD(e, t, n, r) {
                            const o = e[Mo];
                            throw t[wc] && o.unshift(t[wc]), e.message = function yD(e, t, n, r = null) {
                                e = e && "\n" === e.charAt(0) && "\u0275" == e.charAt(1) ? e.slice(2) : e;
                                let o = W(t);
                                if (Array.isArray(t)) o = t.map(W).join(" -> "); else if ("object" == typeof t) {
                                    let i = [];
                                    for (let s in t) if (t.hasOwnProperty(s)) {
                                        let a = t[s];
                                        i.push(s + ":" + ("string" == typeof a ? JSON.stringify(a) : W(a)))
                                    }
                                    o = `{${i.join(", ")}}`
                                }
                                return `${n}${r ? "(" + r + ")" : ""}[${o}]: ${e.replace(dD, "\n  ")}`
                            }("\n" + e.message, o, n, r), e.ngTokenPath = o, e[Mo] = null, e
                        }(s, t, "R3InjectorError", this.source)
                    }
                    throw s
                } finally {
                    Ue(i), bn(o)
                }
            }

            resolveInjectorInitializers() {
                const t = bn(this), n = Ue(void 0);
                try {
                    const r = this.get(Gc.multi, H, S.Self);
                    for (const o of r) o()
                } finally {
                    bn(t), Ue(n)
                }
            }

            toString() {
                const t = [], n = this.records;
                for (const r of n.keys()) t.push(W(r));
                return `R3Injector[${t.join(", ")}]`
            }

            assertNotDestroyed() {
                if (this._destroyed) throw new T(205, !1)
            }

            processProvider(t) {
                let n = Jt(t = M(t)) ? t : M(t && t.provide);
                const r = function iv(e) {
                    return Ns(e) ? Sn(void 0, e.useValue) : Sn(function Xc(e, t, n) {
                        let r;
                        if (Jt(e)) {
                            const o = M(e);
                            return Kt(o) || Os(o)
                        }
                        if (Ns(e)) r = () => M(e.useValue); else if (function Kc(e) {
                            return !(!e || !e.useFactory)
                        }(e)) r = () => e.useFactory(...ws(e.deps || [])); else if (function Yc(e) {
                            return !(!e || !e.useExisting)
                        }(e)) r = () => U(M(e.useExisting)); else {
                            const o = M(e && (e.useClass || e.provide));
                            if (!function sv(e) {
                                return !!e.deps
                            }(e)) return Kt(o) || Os(o);
                            r = () => new o(...ws(e.deps))
                        }
                        return r
                    }(e), Ro)
                }(t);
                if (Jt(t) || !0 !== t.multi) this.records.get(n); else {
                    let o = this.records.get(n);
                    o || (o = Sn(void 0, Ro, !0), o.factory = () => ws(o.multi), this.records.set(n, o)), n = t, o.multi.push(t)
                }
                this.records.set(n, r)
            }

            hydrate(t, n) {
                return n.value === Ro && (n.value = rv, n.value = n.factory()), "object" == typeof n.value && n.value && function av(e) {
                    return null !== e && "object" == typeof e && "function" == typeof e.ngOnDestroy
                }(n.value) && this._ngOnDestroyHooks.add(n.value), n.value
            }

            injectableDefInScope(t) {
                if (!t.providedIn) return !1;
                const n = M(t.providedIn);
                return "string" == typeof n ? "any" === n || this.scopes.has(n) : this.injectorDefTypes.has(n)
            }
        }

        function Os(e) {
            const t = ji(e), n = null !== t ? t.factory : Kt(e);
            if (null !== n) return n;
            if (e instanceof V) throw new T(204, !1);
            if (e instanceof Function) return function ov(e) {
                const t = e.length;
                if (t > 0) throw function mr(e, t) {
                    const n = [];
                    for (let r = 0; r < e; r++) n.push(t);
                    return n
                }(t, "?"), new T(204, !1);
                const n = function Jm(e) {
                    const t = e && (e[ro] || e[Fl]);
                    if (t) {
                        const n = function Xm(e) {
                            if (e.hasOwnProperty("name")) return e.name;
                            const t = ("" + e).match(/^function\s*([^\s(]+)/);
                            return null === t ? "" : t[1]
                        }(e);
                        return console.warn(`DEPRECATED: DI is instantiating a token "${n}" that inherits its @Injectable decorator but does not provide one itself.\nThis will become an error in a future version of Angular. Please add @Injectable() to the "${n}" class.`), t
                    }
                    return null
                }(e);
                return null !== n ? () => n.factory(e) : () => new e
            }(e);
            throw new T(204, !1)
        }

        function Sn(e, t, n = !1) {
            return {factory: e, value: t, multi: n ? [] : void 0}
        }

        function lv(e) {
            return !!e.\u0275providers
        }

        function Rs(e, t) {
            for (const n of e) Array.isArray(n) ? Rs(n, t) : lv(n) ? Rs(n.\u0275providers, t) : t(n)
        }

        class ed {
        }

        class fv {
            resolveComponentFactory(t) {
                throw function dv(e) {
                    const t = Error(`No component factory found for ${W(e)}. Did you add it to @NgModule.entryComponents?`);
                    return t.ngComponent = e, t
                }(t)
            }
        }

        let ko = (() => {
            class e {
            }

            return e.NULL = new fv, e
        })();

        function pv() {
            return An(de(), y())
        }

        function An(e, t) {
            return new xn(We(e, t))
        }

        let xn = (() => {
            class e {
                constructor(n) {
                    this.nativeElement = n
                }
            }

            return e.__NG_ELEMENT_ID__ = pv, e
        })();

        class nd {
        }

        let mv = (() => {
            class e {
            }

            return e.\u0275prov = K({token: e, providedIn: "root", factory: () => null}), e
        })();

        class Ls {
            constructor(t) {
                this.full = t, this.major = t.split(".")[0], this.minor = t.split(".")[1], this.patch = t.split(".").slice(2).join(".")
            }
        }

        const yv = new Ls("14.1.1"), ks = {};

        function $s(e) {
            return e.ngOriginalError
        }

        class Nn {
            constructor() {
                this._console = console
            }

            handleError(t) {
                const n = this._findOriginalError(t);
                this._console.error("ERROR", t), n && this._console.error("ORIGINAL ERROR", n)
            }

            _findOriginalError(t) {
                let n = t && $s(t);
                for (; n && $s(n);) n = $s(n);
                return n || null
            }
        }

        const Us = new Map;
        let Av = 0;
        const zs = "__ngContext__";

        function ve(e, t) {
            xe(t) ? (e[zs] = t[20], function Nv(e) {
                Us.set(e[20], e)
            }(t)) : e[zs] = t
        }

        function Ir(e) {
            const t = e[zs];
            return "number" == typeof t ? function ld(e) {
                return Us.get(e) || null
            }(t) : t || null
        }

        function qs(e) {
            const t = Ir(e);
            return t ? xe(t) ? t : t.lView : null
        }

        const Bv = (() => (typeof requestAnimationFrame < "u" && requestAnimationFrame || setTimeout).bind(z))();
        var Ne = (() => ((Ne = Ne || {})[Ne.Important = 1] = "Important", Ne[Ne.DashCase = 2] = "DashCase", Ne))();

        function Qs(e, t) {
            return undefined(e, t)
        }

        function Mr(e) {
            const t = e[3];
            return Xe(t) ? t[3] : t
        }

        function Zs(e) {
            return yd(e[13])
        }

        function Ys(e) {
            return yd(e[4])
        }

        function yd(e) {
            for (; null !== e && !Xe(e);) e = e[4];
            return e
        }

        function Pn(e, t, n, r, o) {
            if (null != r) {
                let i, s = !1;
                Xe(r) ? i = r : xe(r) && (s = !0, r = r[0]);
                const a = ae(r);
                0 === e && null !== n ? null == o ? Ed(t, n, a) : Xt(t, n, a, o || null, !0) : 1 === e && null !== n ? Xt(t, n, a, o || null, !0) : 2 === e ? function xd(e, t, n) {
                    const r = Vo(e, t);
                    r && function o_(e, t, n, r) {
                        e.removeChild(t, n, r)
                    }(e, r, t, n)
                }(t, a, s) : 3 === e && t.destroyNode(a), null != i && function a_(e, t, n, r, o) {
                    const i = n[7];
                    i !== ae(n) && Pn(t, e, r, i, o);
                    for (let a = 10; a < n.length; a++) {
                        const u = n[a];
                        Tr(u[1], u, e, t, r, i)
                    }
                }(t, e, i, n, o)
            }
        }

        function Js(e, t, n) {
            return e.createElement(t, n)
        }

        function vd(e, t) {
            const n = e[9], r = n.indexOf(t), o = t[3];
            512 & t[2] && (t[2] &= -513, Xi(o, -1)), n.splice(r, 1)
        }

        function Xs(e, t) {
            if (e.length <= 10) return;
            const n = 10 + t, r = e[n];
            if (r) {
                const o = r[17];
                null !== o && o !== e && vd(o, r), t > 0 && (e[n - 1][4] = r[4]);
                const i = bo(e, 10 + t);
                !function Yv(e, t) {
                    Tr(e, t, t[O], 2, null, null), t[0] = null, t[6] = null
                }(r[1], r);
                const s = i[19];
                null !== s && s.detachView(i[1]), r[3] = null, r[4] = null, r[2] &= -65
            }
            return r
        }

        function _d(e, t) {
            if (!(128 & t[2])) {
                const n = t[O];
                n.destroyNode && Tr(e, t, n, 3, null, null), function Xv(e) {
                    let t = e[13];
                    if (!t) return ea(e[1], e);
                    for (; t;) {
                        let n = null;
                        if (xe(t)) n = t[13]; else {
                            const r = t[10];
                            r && (n = r)
                        }
                        if (!n) {
                            for (; t && !t[4] && t !== e;) xe(t) && ea(t[1], t), t = t[3];
                            null === t && (t = e), xe(t) && ea(t[1], t), n = t && t[4]
                        }
                        t = n
                    }
                }(t)
            }
        }

        function ea(e, t) {
            if (!(128 & t[2])) {
                t[2] &= -65, t[2] |= 128, function r_(e, t) {
                    let n;
                    if (null != e && null != (n = e.destroyHooks)) for (let r = 0; r < n.length; r += 2) {
                        const o = t[n[r]];
                        if (!(o instanceof cr)) {
                            const i = n[r + 1];
                            if (Array.isArray(i)) for (let s = 0; s < i.length; s += 2) {
                                const a = o[i[s]], u = i[s + 1];
                                try {
                                    u.call(a)
                                } finally {
                                }
                            } else try {
                                i.call(o)
                            } finally {
                            }
                        }
                    }
                }(e, t), function n_(e, t) {
                    const n = e.cleanup, r = t[7];
                    let o = -1;
                    if (null !== n) for (let i = 0; i < n.length - 1; i += 2) if ("string" == typeof n[i]) {
                        const s = n[i + 1], a = "function" == typeof s ? s(t) : ae(t[s]), u = r[o = n[i + 2]],
                            l = n[i + 3];
                        "boolean" == typeof l ? a.removeEventListener(n[i], u, l) : l >= 0 ? r[o = l]() : r[o = -l].unsubscribe(), i += 2
                    } else {
                        const s = r[o = n[i + 1]];
                        n[i].call(s)
                    }
                    if (null !== r) {
                        for (let i = o + 1; i < r.length; i++) (0, r[i])();
                        t[7] = null
                    }
                }(e, t), 1 === t[1].type && t[O].destroy();
                const n = t[17];
                if (null !== n && Xe(t[3])) {
                    n !== t[3] && vd(n, t);
                    const r = t[19];
                    null !== r && r.detachView(e)
                }
                !function Fv(e) {
                    Us.delete(e[20])
                }(t)
            }
        }

        function wd(e, t, n) {
            return function Cd(e, t, n) {
                let r = t;
                for (; null !== r && 40 & r.type;) r = (t = r).parent;
                if (null === r) return n[0];
                if (2 & r.flags) {
                    const o = e.data[r.directiveStart].encapsulation;
                    if (o === lt.None || o === lt.Emulated) return null
                }
                return We(r, n)
            }(e, t.parent, n)
        }

        function Xt(e, t, n, r, o) {
            e.insertBefore(t, n, r, o)
        }

        function Ed(e, t, n) {
            e.appendChild(t, n)
        }

        function bd(e, t, n, r, o) {
            null !== r ? Xt(e, t, n, r, o) : Ed(e, t, n)
        }

        function Vo(e, t) {
            return e.parentNode(t)
        }

        let Td = function Md(e, t, n) {
            return 40 & e.type ? We(e, n) : null
        };

        function jo(e, t, n, r) {
            const o = wd(e, r, t), i = t[O], a = function Id(e, t, n) {
                return Td(e, t, n)
            }(r.parent || t[6], r, t);
            if (null != o) if (Array.isArray(n)) for (let u = 0; u < n.length; u++) bd(i, o, n[u], a, !1); else bd(i, o, n, a, !1)
        }

        function Bo(e, t) {
            if (null !== t) {
                const n = t.type;
                if (3 & n) return We(t, e);
                if (4 & n) return na(-1, e[t.index]);
                if (8 & n) {
                    const r = t.child;
                    if (null !== r) return Bo(e, r);
                    {
                        const o = e[t.index];
                        return Xe(o) ? na(-1, o) : ae(o)
                    }
                }
                if (32 & n) return Qs(t, e)() || ae(e[t.index]);
                {
                    const r = Ad(e, t);
                    return null !== r ? Array.isArray(r) ? r[0] : Bo(Mr(e[16]), r) : Bo(e, t.next)
                }
            }
            return null
        }

        function Ad(e, t) {
            return null !== t ? e[16][6].projection[t.projection] : null
        }

        function na(e, t) {
            const n = 10 + e + 1;
            if (n < t.length) {
                const r = t[n], o = r[1].firstChild;
                if (null !== o) return Bo(r, o)
            }
            return t[7]
        }

        function ra(e, t, n, r, o, i, s) {
            for (; null != n;) {
                const a = r[n.index], u = n.type;
                if (s && 0 === t && (a && ve(ae(a), r), n.flags |= 4), 64 != (64 & n.flags)) if (8 & u) ra(e, t, n.child, r, o, i, !1), Pn(t, e, o, a, i); else if (32 & u) {
                    const l = Qs(n, r);
                    let c;
                    for (; c = l();) Pn(t, e, o, c, i);
                    Pn(t, e, o, a, i)
                } else 16 & u ? Nd(e, t, r, n, o, i) : Pn(t, e, o, a, i);
                n = s ? n.projectionNext : n.next
            }
        }

        function Tr(e, t, n, r, o, i) {
            ra(n, r, e.firstChild, t, o, i, !1)
        }

        function Nd(e, t, n, r, o, i) {
            const s = n[16], u = s[6].projection[r.projection];
            if (Array.isArray(u)) for (let l = 0; l < u.length; l++) Pn(t, e, o, u[l], i); else ra(e, t, u, s[3], o, i, !0)
        }

        function Fd(e, t, n) {
            e.setAttribute(t, "style", n)
        }

        function oa(e, t, n) {
            "" === n ? e.removeAttribute(t, "class") : e.setAttribute(t, "class", n)
        }

        function Pd(e, t, n) {
            let r = e.length;
            for (; ;) {
                const o = e.indexOf(t, n);
                if (-1 === o) return o;
                if (0 === o || e.charCodeAt(o - 1) <= 32) {
                    const i = t.length;
                    if (o + i === r || e.charCodeAt(o + i) <= 32) return o
                }
                n = o + 1
            }
        }

        const Od = "ng-template";

        function l_(e, t, n) {
            let r = 0;
            for (; r < e.length;) {
                let o = e[r++];
                if (n && "class" === o) {
                    if (o = e[r], -1 !== Pd(o.toLowerCase(), t, 0)) return !0
                } else if (1 === o) {
                    for (; r < e.length && "string" == typeof (o = e[r++]);) if (o.toLowerCase() === t) return !0;
                    return !1
                }
            }
            return !1
        }

        function Rd(e) {
            return 4 === e.type && e.value !== Od
        }

        function c_(e, t, n) {
            return t === (4 !== e.type || n ? e.value : Od)
        }

        function d_(e, t, n) {
            let r = 4;
            const o = e.attrs || [], i = function h_(e) {
                for (let t = 0; t < e.length; t++) if (rc(e[t])) return t;
                return e.length
            }(o);
            let s = !1;
            for (let a = 0; a < t.length; a++) {
                const u = t[a];
                if ("number" != typeof u) {
                    if (!s) if (4 & r) {
                        if (r = 2 | 1 & r, "" !== u && !c_(e, u, n) || "" === u && 1 === t.length) {
                            if (tt(r)) return !1;
                            s = !0
                        }
                    } else {
                        const l = 8 & r ? u : t[++a];
                        if (8 & r && null !== e.attrs) {
                            if (!l_(e.attrs, l, n)) {
                                if (tt(r)) return !1;
                                s = !0
                            }
                            continue
                        }
                        const d = f_(8 & r ? "class" : u, o, Rd(e), n);
                        if (-1 === d) {
                            if (tt(r)) return !1;
                            s = !0;
                            continue
                        }
                        if ("" !== l) {
                            let f;
                            f = d > i ? "" : o[d + 1].toLowerCase();
                            const p = 8 & r ? f : null;
                            if (p && -1 !== Pd(p, l, 0) || 2 & r && l !== f) {
                                if (tt(r)) return !1;
                                s = !0
                            }
                        }
                    }
                } else {
                    if (!s && !tt(r) && !tt(u)) return !1;
                    if (s && tt(u)) continue;
                    s = !1, r = u | 1 & r
                }
            }
            return tt(r) || s
        }

        function tt(e) {
            return 0 == (1 & e)
        }

        function f_(e, t, n, r) {
            if (null === t) return -1;
            let o = 0;
            if (r || !n) {
                let i = !1;
                for (; o < t.length;) {
                    const s = t[o];
                    if (s === e) return o;
                    if (3 === s || 6 === s) i = !0; else {
                        if (1 === s || 2 === s) {
                            let a = t[++o];
                            for (; "string" == typeof a;) a = t[++o];
                            continue
                        }
                        if (4 === s) break;
                        if (0 === s) {
                            o += 4;
                            continue
                        }
                    }
                    o += i ? 1 : 2
                }
                return -1
            }
            return function g_(e, t) {
                let n = e.indexOf(4);
                if (n > -1) for (n++; n < e.length;) {
                    const r = e[n];
                    if ("number" == typeof r) return -1;
                    if (r === t) return n;
                    n++
                }
                return -1
            }(t, e)
        }

        function Ld(e, t, n = !1) {
            for (let r = 0; r < t.length; r++) if (d_(e, t[r], n)) return !0;
            return !1
        }

        function kd(e, t) {
            return e ? ":not(" + t.trim() + ")" : t
        }

        function y_(e) {
            let t = e[0], n = 1, r = 2, o = "", i = !1;
            for (; n < e.length;) {
                let s = e[n];
                if ("string" == typeof s) if (2 & r) {
                    const a = e[++n];
                    o += "[" + s + (a.length > 0 ? '="' + a + '"' : "") + "]"
                } else 8 & r ? o += "." + s : 4 & r && (o += " " + s); else "" !== o && !tt(s) && (t += kd(i, o), o = ""), r = s, i = i || !tt(r);
                n++
            }
            return "" !== o && (t += kd(i, o)), t
        }

        const N = {};

        function He(e) {
            Vd(j(), y(), be() + e, !1)
        }

        function Vd(e, t, n, r) {
            if (!r) if (3 == (3 & t[2])) {
                const i = e.preOrderCheckHooks;
                null !== i && mo(t, i, n)
            } else {
                const i = e.preOrderHooks;
                null !== i && yo(t, i, 0, n)
            }
            Lt(n)
        }

        function $d(e, t = null, n = null, r) {
            const o = Ud(e, t, n, r);
            return o.resolveInjectorInitializers(), o
        }

        function Ud(e, t = null, n = null, r, o = new Set) {
            const i = [n || H, ev(e)];
            return r = r || ("object" == typeof e ? void 0 : W(e)), new Jc(i, t || Lo(), r || null, o)
        }

        let en = (() => {
            class e {
                static create(n, r) {
                    if (Array.isArray(n)) return $d({name: ""}, r, n, "");
                    {
                        const o = n.name ?? "";
                        return $d({name: o}, n.parent, n.providers, o)
                    }
                }
            }

            return e.THROW_IF_NOT_FOUND = yr, e.NULL = new Wc, e.\u0275prov = K({
                token: e,
                providedIn: "any",
                factory: () => U(zc)
            }), e.__NG_ELEMENT_ID__ = -1, e
        })();

        function L(e, t = S.Default) {
            const n = y();
            return null === n ? U(e, t) : dc(de(), n, M(e), t)
        }

        function af(e, t) {
            const n = e.contentQueries;
            if (null !== n) for (let r = 0; r < n.length; r += 2) {
                const o = n[r], i = n[r + 1];
                if (-1 !== i) {
                    const s = e.data[i];
                    ss(o), s.contentQueries(2, t[i], i)
                }
            }
        }

        function zo(e, t, n, r, o, i, s, a, u, l, c) {
            const d = t.blueprint.slice();
            return d[0] = o, d[2] = 76 | r, (null !== c || e && 1024 & e[2]) && (d[2] |= 1024), Gl(d), d[3] = d[15] = e, d[8] = n, d[10] = s || e && e[10], d[O] = a || e && e[O], d[12] = u || e && e[12] || null, d[9] = l || e && e[9] || null, d[6] = i, d[20] = function xv() {
                return Av++
            }(), d[21] = c, d[16] = 2 == t.type ? e[16] : d, d
        }

        function Rn(e, t, n, r, o) {
            let i = e.data[t];
            if (null === i) i = function _a(e, t, n, r, o) {
                const i = Wl(), s = ns(), u = e.data[t] = function tw(e, t, n, r, o, i) {
                    return {
                        type: n,
                        index: r,
                        insertBeforeIndex: null,
                        injectorIndex: t ? t.injectorIndex : -1,
                        directiveStart: -1,
                        directiveEnd: -1,
                        directiveStylingLast: -1,
                        propertyBindings: null,
                        flags: 0,
                        providerIndexes: 0,
                        value: o,
                        attrs: i,
                        mergedAttrs: null,
                        localNames: null,
                        initialInputs: void 0,
                        inputs: null,
                        outputs: null,
                        tViews: null,
                        next: null,
                        projectionNext: null,
                        child: null,
                        parent: t,
                        projection: null,
                        styles: null,
                        stylesWithoutHost: null,
                        residualStyles: void 0,
                        classes: null,
                        classesWithoutHost: null,
                        residualClasses: void 0,
                        classBindings: 0,
                        styleBindings: 0
                    }
                }(0, s ? i : i && i.parent, n, t, r, o);
                return null === e.firstChild && (e.firstChild = u), null !== i && (s ? null == i.child && null !== u.parent && (i.child = u) : null === i.next && (i.next = u)), u
            }(e, t, n, r, o), function Sy() {
                return A.lFrame.inI18n
            }() && (i.flags |= 64); else if (64 & i.type) {
                i.type = n, i.value = r, i.attrs = o;
                const s = function lr() {
                    const e = A.lFrame, t = e.currentTNode;
                    return e.isParent ? t : t.parent
                }();
                i.injectorIndex = null === s ? -1 : s.injectorIndex
            }
            return ct(i, !0), i
        }

        function Ln(e, t, n, r) {
            if (0 === n) return -1;
            const o = t.length;
            for (let i = 0; i < n; i++) t.push(r), e.blueprint.push(r), e.data.push(null);
            return o
        }

        function qo(e, t, n) {
            as(t);
            try {
                const r = e.viewQuery;
                null !== r && Aa(1, r, n);
                const o = e.template;
                null !== o && uf(e, t, o, 1, n), e.firstCreatePass && (e.firstCreatePass = !1), e.staticContentQueries && af(e, t), e.staticViewQueries && Aa(2, e.viewQuery, n);
                const i = e.components;
                null !== i && function K_(e, t) {
                    for (let n = 0; n < t.length; n++) yw(e, t[n])
                }(t, i)
            } catch (r) {
                throw e.firstCreatePass && (e.incompleteFirstPass = !0, e.firstCreatePass = !1), r
            } finally {
                t[2] &= -5, us()
            }
        }

        function Sr(e, t, n, r) {
            const o = t[2];
            if (128 != (128 & o)) {
                as(t);
                try {
                    Gl(t), function Ql(e) {
                        return A.lFrame.bindingIndex = e
                    }(e.bindingStartIndex), null !== n && uf(e, t, n, 2, r);
                    const s = 3 == (3 & o);
                    if (s) {
                        const l = e.preOrderCheckHooks;
                        null !== l && mo(t, l, null)
                    } else {
                        const l = e.preOrderHooks;
                        null !== l && yo(t, l, 0, null), ls(t, 0)
                    }
                    if (function gw(e) {
                        for (let t = Zs(e); null !== t; t = Ys(t)) {
                            if (!t[2]) continue;
                            const n = t[9];
                            for (let r = 0; r < n.length; r++) {
                                const o = n[r], i = o[3];
                                0 == (512 & o[2]) && Xi(i, 1), o[2] |= 512
                            }
                        }
                    }(t), function hw(e) {
                        for (let t = Zs(e); null !== t; t = Ys(t)) for (let n = 10; n < t.length; n++) {
                            const r = t[n], o = r[1];
                            Ji(r) && Sr(o, r, o.template, r[8])
                        }
                    }(t), null !== e.contentQueries && af(e, t), s) {
                        const l = e.contentCheckHooks;
                        null !== l && mo(t, l)
                    } else {
                        const l = e.contentHooks;
                        null !== l && yo(t, l, 1), ls(t, 1)
                    }
                    !function Z_(e, t) {
                        const n = e.hostBindingOpCodes;
                        if (null !== n) try {
                            for (let r = 0; r < n.length; r++) {
                                const o = n[r];
                                if (o < 0) Lt(~o); else {
                                    const i = o, s = n[++r], a = n[++r];
                                    Ay(s, i), a(2, t[i])
                                }
                            }
                        } finally {
                            Lt(-1)
                        }
                    }(e, t);
                    const a = e.components;
                    null !== a && function Y_(e, t) {
                        for (let n = 0; n < t.length; n++) mw(e, t[n])
                    }(t, a);
                    const u = e.viewQuery;
                    if (null !== u && Aa(2, u, r), s) {
                        const l = e.viewCheckHooks;
                        null !== l && mo(t, l)
                    } else {
                        const l = e.viewHooks;
                        null !== l && yo(t, l, 2), ls(t, 2)
                    }
                    !0 === e.firstUpdatePass && (e.firstUpdatePass = !1), t[2] &= -41, 512 & t[2] && (t[2] &= -513, Xi(t[3], -1))
                } finally {
                    us()
                }
            }
        }

        function J_(e, t, n, r) {
            const o = t[10], s = function Ul(e) {
                return 4 == (4 & e[2])
            }(t);
            try {
                !s && o.begin && o.begin(), s && qo(e, t, r), Sr(e, t, n, r)
            } finally {
                !s && o.end && o.end()
            }
        }

        function uf(e, t, n, r, o) {
            const i = be(), s = 2 & r;
            try {
                Lt(-1), s && t.length > Q && Vd(e, t, Q, !1), n(r, o)
            } finally {
                Lt(i)
            }
        }

        function wa(e, t, n) {
            !ql() || (function sw(e, t, n, r) {
                const o = n.directiveStart, i = n.directiveEnd;
                e.firstCreatePass || fr(n, t), ve(r, t);
                const s = n.initialInputs;
                for (let a = o; a < i; a++) {
                    const u = e.data[a], l = et(u);
                    l && dw(t, n, u);
                    const c = pr(t, e, a, n);
                    ve(c, t), null !== s && fw(0, a - o, c, u, 0, s), l && (Ve(n.index, t)[8] = c)
                }
            }(e, t, n, We(n, t)), 128 == (128 & n.flags) && function aw(e, t, n) {
                const r = n.directiveStart, o = n.directiveEnd, i = n.index, s = function xy() {
                    return A.lFrame.currentDirectiveIndex
                }();
                try {
                    Lt(i);
                    for (let a = r; a < o; a++) {
                        const u = e.data[a], l = t[a];
                        os(a), (null !== u.hostBindings || 0 !== u.hostVars || null !== u.hostAttrs) && mf(u, l)
                    }
                } finally {
                    Lt(-1), os(s)
                }
            }(e, t, n))
        }

        function Ca(e, t, n = We) {
            const r = t.localNames;
            if (null !== r) {
                let o = t.index + 1;
                for (let i = 0; i < r.length; i += 2) {
                    const s = r[i + 1], a = -1 === s ? n(t, e) : e[s];
                    e[o++] = a
                }
            }
        }

        function cf(e) {
            const t = e.tView;
            return null === t || t.incompleteFirstPass ? e.tView = Ea(1, null, e.template, e.decls, e.vars, e.directiveDefs, e.pipeDefs, e.viewQuery, e.schemas, e.consts) : t
        }

        function Ea(e, t, n, r, o, i, s, a, u, l) {
            const c = Q + r, d = c + o, f = function X_(e, t) {
                const n = [];
                for (let r = 0; r < t; r++) n.push(r < e ? null : N);
                return n
            }(c, d), p = "function" == typeof l ? l() : l;
            return f[1] = {
                type: e,
                blueprint: f,
                template: n,
                queries: null,
                viewQuery: a,
                declTNode: t,
                data: f.slice().fill(null, c),
                bindingStartIndex: c,
                expandoStartIndex: d,
                hostBindingOpCodes: null,
                firstCreatePass: !0,
                firstUpdatePass: !0,
                staticViewQueries: !1,
                staticContentQueries: !1,
                preOrderHooks: null,
                preOrderCheckHooks: null,
                contentHooks: null,
                contentCheckHooks: null,
                viewHooks: null,
                viewCheckHooks: null,
                destroyHooks: null,
                cleanup: null,
                contentQueries: null,
                components: null,
                directiveRegistry: "function" == typeof i ? i() : i,
                pipeRegistry: "function" == typeof s ? s() : s,
                firstChild: null,
                schemas: u,
                consts: p,
                incompleteFirstPass: !1
            }
        }

        function ff(e, t, n) {
            for (let r in e) if (e.hasOwnProperty(r)) {
                const o = e[r];
                (n = null === n ? {} : n).hasOwnProperty(r) ? n[r].push(t, o) : n[r] = [t, o]
            }
            return n
        }

        function pf(e, t) {
            const r = t.directiveEnd, o = e.data, i = t.attrs, s = [];
            let a = null, u = null;
            for (let l = t.directiveStart; l < r; l++) {
                const c = o[l], d = c.inputs, f = null === i || Rd(t) ? null : pw(d, i);
                s.push(f), a = ff(d, l, a), u = ff(c.outputs, l, u)
            }
            null !== a && (a.hasOwnProperty("class") && (t.flags |= 16), a.hasOwnProperty("style") && (t.flags |= 32)), t.initialInputs = s, t.inputs = a, t.outputs = u
        }

        function hf(e, t) {
            const n = Ve(t, e);
            16 & n[2] || (n[2] |= 32)
        }

        function ba(e, t, n, r) {
            let o = !1;
            if (ql()) {
                const i = function uw(e, t, n) {
                    const r = e.directiveRegistry;
                    let o = null;
                    if (r) for (let i = 0; i < r.length; i++) {
                        const s = r[i];
                        Ld(n, s.selectors, !1) && (o || (o = []), Co(fr(n, t), e, s.type), et(s) ? (yf(e, n), o.unshift(s)) : o.push(s))
                    }
                    return o
                }(e, t, n), s = null === r ? null : {"": -1};
                if (null !== i) {
                    o = !0, Df(n, e.data.length, i.length);
                    for (let c = 0; c < i.length; c++) {
                        const d = i[c];
                        d.providersResolver && d.providersResolver(d)
                    }
                    let a = !1, u = !1, l = Ln(e, t, i.length, null);
                    for (let c = 0; c < i.length; c++) {
                        const d = i[c];
                        n.mergedAttrs = vo(n.mergedAttrs, d.hostAttrs), vf(e, n, t, l, d), cw(l, d, s), null !== d.contentQueries && (n.flags |= 8), (null !== d.hostBindings || null !== d.hostAttrs || 0 !== d.hostVars) && (n.flags |= 128);
                        const f = d.type.prototype;
                        !a && (f.ngOnChanges || f.ngOnInit || f.ngDoCheck) && ((e.preOrderHooks || (e.preOrderHooks = [])).push(n.index), a = !0), !u && (f.ngOnChanges || f.ngDoCheck) && ((e.preOrderCheckHooks || (e.preOrderCheckHooks = [])).push(n.index), u = !0), l++
                    }
                    pf(e, n)
                }
                s && function lw(e, t, n) {
                    if (t) {
                        const r = e.localNames = [];
                        for (let o = 0; o < t.length; o += 2) {
                            const i = n[t[o + 1]];
                            if (null == i) throw new T(-301, !1);
                            r.push(t[o], i)
                        }
                    }
                }(n, r, s)
            }
            return n.mergedAttrs = vo(n.mergedAttrs, n.attrs), o
        }

        function gf(e, t, n, r, o, i) {
            const s = i.hostBindings;
            if (s) {
                let a = e.hostBindingOpCodes;
                null === a && (a = e.hostBindingOpCodes = []);
                const u = ~t.index;
                (function iw(e) {
                    let t = e.length;
                    for (; t > 0;) {
                        const n = e[--t];
                        if ("number" == typeof n && n < 0) return n
                    }
                    return 0
                })(a) != u && a.push(u), a.push(r, o, s)
            }
        }

        function mf(e, t) {
            null !== e.hostBindings && e.hostBindings(1, t)
        }

        function yf(e, t) {
            t.flags |= 2, (e.components || (e.components = [])).push(t.index)
        }

        function cw(e, t, n) {
            if (n) {
                if (t.exportAs) for (let r = 0; r < t.exportAs.length; r++) n[t.exportAs[r]] = e;
                et(t) && (n[""] = e)
            }
        }

        function Df(e, t, n) {
            e.flags |= 1, e.directiveStart = t, e.directiveEnd = t + n, e.providerIndexes = t
        }

        function vf(e, t, n, r, o) {
            e.data[r] = o;
            const i = o.factory || (o.factory = Kt(o.type)), s = new cr(i, et(o), L);
            e.blueprint[r] = s, n[r] = s, gf(e, t, 0, r, Ln(e, n, o.hostVars, N), o)
        }

        function dw(e, t, n) {
            const r = We(t, e), o = cf(n), i = e[10],
                s = Wo(e, zo(e, o, null, n.onPush ? 32 : 16, r, t, i, i.createRenderer(r, n), null, null, null));
            e[t.index] = s
        }

        function fw(e, t, n, r, o, i) {
            const s = i[t];
            if (null !== s) {
                const a = r.setInput;
                for (let u = 0; u < s.length;) {
                    const l = s[u++], c = s[u++], d = s[u++];
                    null !== a ? r.setInput(n, d, l, c) : n[c] = d
                }
            }
        }

        function pw(e, t) {
            let n = null, r = 0;
            for (; r < t.length;) {
                const o = t[r];
                if (0 !== o) if (5 !== o) {
                    if ("number" == typeof o) break;
                    e.hasOwnProperty(o) && (null === n && (n = []), n.push(o, e[o], t[r + 1])), r += 2
                } else r += 2; else r += 4
            }
            return n
        }

        function _f(e, t, n, r) {
            return new Array(e, !0, !1, t, null, 0, r, n, null, null)
        }

        function mw(e, t) {
            const n = Ve(t, e);
            if (Ji(n)) {
                const r = n[1];
                48 & n[2] ? Sr(r, n, r.template, n[8]) : n[5] > 0 && Ma(n)
            }
        }

        function Ma(e) {
            for (let r = Zs(e); null !== r; r = Ys(r)) for (let o = 10; o < r.length; o++) {
                const i = r[o];
                if (512 & i[2]) {
                    const s = i[1];
                    Sr(s, i, s.template, i[8])
                } else i[5] > 0 && Ma(i)
            }
            const n = e[1].components;
            if (null !== n) for (let r = 0; r < n.length; r++) {
                const o = Ve(n[r], e);
                Ji(o) && o[5] > 0 && Ma(o)
            }
        }

        function yw(e, t) {
            const n = Ve(t, e), r = n[1];
            (function Dw(e, t) {
                for (let n = t.length; n < e.blueprint.length; n++) t.push(e.blueprint[n])
            })(r, n), qo(r, n, n[8])
        }

        function Wo(e, t) {
            return e[13] ? e[14][4] = t : e[13] = t, e[14] = t, t
        }

        function Ta(e) {
            for (; e;) {
                e[2] |= 32;
                const t = Mr(e);
                if (ly(e) && !t) return e;
                e = t
            }
            return null
        }

        function Cf(e) {
            !function wf(e) {
                for (let t = 0; t < e.components.length; t++) {
                    const n = e.components[t], r = qs(n);
                    if (null !== r) {
                        const o = r[1];
                        J_(o, r, o.template, n)
                    }
                }
            }(e[8])
        }

        function Aa(e, t, n) {
            ss(0), t(e, n)
        }

        const _w = (() => Promise.resolve(null))();

        function Ef(e) {
            return e[7] || (e[7] = [])
        }

        function bf(e) {
            return e.cleanup || (e.cleanup = [])
        }

        function Mf(e, t) {
            const n = e[9], r = n ? n.get(Nn, null) : null;
            r && r.handleError(t)
        }

        function xa(e, t, n, r, o) {
            for (let i = 0; i < n.length;) {
                const s = n[i++], a = n[i++], u = t[s], l = e.data[s];
                null !== l.setInput ? l.setInput(u, o, r, a) : u[a] = o
            }
        }

        function Mt(e, t, n) {
            const r = function po(e, t) {
                return ae(t[e])
            }(t, e);
            !function Dd(e, t, n) {
                e.setValue(t, n)
            }(e[O], r, n)
        }

        function Qo(e, t, n) {
            let r = n ? e.styles : null, o = n ? e.classes : null, i = 0;
            if (null !== t) for (let s = 0; s < t.length; s++) {
                const a = t[s];
                "number" == typeof a ? i = a : 1 == i ? o = Li(o, a) : 2 == i && (r = Li(r, a + ": " + t[++s] + ";"))
            }
            n ? e.styles = r : e.stylesWithoutHost = r, n ? e.classes = o : e.classesWithoutHost = o
        }

        function Zo(e, t, n, r, o = !1) {
            for (; null !== n;) {
                const i = t[n.index];
                if (null !== i && r.push(ae(i)), Xe(i)) for (let a = 10; a < i.length; a++) {
                    const u = i[a], l = u[1].firstChild;
                    null !== l && Zo(u[1], u, l, r)
                }
                const s = n.type;
                if (8 & s) Zo(e, t, n.child, r); else if (32 & s) {
                    const a = Qs(n, t);
                    let u;
                    for (; u = a();) r.push(u)
                } else if (16 & s) {
                    const a = Ad(t, n);
                    if (Array.isArray(a)) r.push(...a); else {
                        const u = Mr(t[16]);
                        Zo(u[1], u, a, r, !0)
                    }
                }
                n = o ? n.projectionNext : n.next
            }
            return r
        }

        class Ar {
            constructor(t, n) {
                this._lView = t, this._cdRefInjectingView = n, this._appRef = null, this._attachedToViewContainer = !1
            }

            get rootNodes() {
                const t = this._lView, n = t[1];
                return Zo(n, t, n.firstChild, [])
            }

            get context() {
                return this._lView[8]
            }

            set context(t) {
                this._lView[8] = t
            }

            get destroyed() {
                return 128 == (128 & this._lView[2])
            }

            destroy() {
                if (this._appRef) this._appRef.detachView(this); else if (this._attachedToViewContainer) {
                    const t = this._lView[3];
                    if (Xe(t)) {
                        const n = t[8], r = n ? n.indexOf(this) : -1;
                        r > -1 && (Xs(t, r), bo(n, r))
                    }
                    this._attachedToViewContainer = !1
                }
                _d(this._lView[1], this._lView)
            }

            onDestroy(t) {
                !function df(e, t, n, r) {
                    const o = Ef(t);
                    null === n ? o.push(r) : (o.push(n), e.firstCreatePass && bf(e).push(r, o.length - 1))
                }(this._lView[1], this._lView, null, t)
            }

            markForCheck() {
                Ta(this._cdRefInjectingView || this._lView)
            }

            detach() {
                this._lView[2] &= -65
            }

            reattach() {
                this._lView[2] |= 64
            }

            detectChanges() {
                !function Sa(e, t, n) {
                    const r = t[10];
                    r.begin && r.begin();
                    try {
                        Sr(e, t, e.template, n)
                    } catch (o) {
                        throw Mf(t, o), o
                    } finally {
                        r.end && r.end()
                    }
                }(this._lView[1], this._lView, this.context)
            }

            checkNoChanges() {
            }

            attachToViewContainerRef() {
                if (this._appRef) throw new T(902, !1);
                this._attachedToViewContainer = !0
            }

            detachFromAppRef() {
                this._appRef = null, function Jv(e, t) {
                    Tr(e, t, t[O], 2, null, null)
                }(this._lView[1], this._lView)
            }

            attachToAppRef(t) {
                if (this._attachedToViewContainer) throw new T(902, !1);
                this._appRef = t
            }
        }

        class ww extends Ar {
            constructor(t) {
                super(t), this._view = t
            }

            detectChanges() {
                Cf(this._view)
            }

            checkNoChanges() {
            }

            get context() {
                return null
            }
        }

        class Na extends ko {
            constructor(t) {
                super(), this.ngModule = t
            }

            resolveComponentFactory(t) {
                const n = G(t);
                return new xr(n, this.ngModule)
            }
        }

        function Tf(e) {
            const t = [];
            for (let n in e) e.hasOwnProperty(n) && t.push({propName: e[n], templateName: n});
            return t
        }

        class Ew {
            constructor(t, n) {
                this.injector = t, this.parentInjector = n
            }

            get(t, n, r) {
                const o = this.injector.get(t, ks, r);
                return o !== ks || n === ks ? o : this.parentInjector.get(t, n, r)
            }
        }

        class xr extends ed {
            constructor(t, n) {
                super(), this.componentDef = t, this.ngModule = n, this.componentType = t.type, this.selector = function D_(e) {
                    return e.map(y_).join(",")
                }(t.selectors), this.ngContentSelectors = t.ngContentSelectors ? t.ngContentSelectors : [], this.isBoundToModule = !!n
            }

            get inputs() {
                return Tf(this.componentDef.inputs)
            }

            get outputs() {
                return Tf(this.componentDef.outputs)
            }

            create(t, n, r, o) {
                let i = (o = o || this.ngModule) instanceof Tn ? o : o?.injector;
                i && null !== this.componentDef.getStandaloneInjector && (i = this.componentDef.getStandaloneInjector(i) || i);
                const s = i ? new Ew(t, i) : t, a = s.get(nd, null);
                if (null === a) throw new T(407, !1);
                const u = s.get(mv, null), l = a.createRenderer(null, this.componentDef),
                    c = this.componentDef.selectors[0][0] || "div", d = r ? function ew(e, t, n) {
                        return e.selectRootElement(t, n === lt.ShadowDom)
                    }(l, r, this.componentDef.encapsulation) : Js(a.createRenderer(null, this.componentDef), c, function Cw(e) {
                        const t = e.toLowerCase();
                        return "svg" === t ? "svg" : "math" === t ? "math" : null
                    }(c)), f = this.componentDef.onPush ? 288 : 272, p = function Sw(e, t) {
                        return {components: [], scheduler: e || Bv, clean: _w, playerHandler: t || null, flags: 0}
                    }(), h = Ea(0, null, null, 1, 0, null, null, null, null, null),
                    g = zo(null, h, p, f, null, null, a, l, u, s, null);
                let D, v;
                as(g);
                try {
                    const C = function Mw(e, t, n, r, o, i) {
                        const s = n[1];
                        n[22] = e;
                        const u = Rn(s, 22, 2, "#host", null), l = u.mergedAttrs = t.hostAttrs;
                        null !== l && (Qo(u, l, !0), null !== e && (Do(o, e, l), null !== u.classes && oa(o, e, u.classes), null !== u.styles && Fd(o, e, u.styles)));
                        const c = r.createRenderer(e, t),
                            d = zo(n, cf(t), null, t.onPush ? 32 : 16, n[22], u, r, c, i || null, null, null);
                        return s.firstCreatePass && (Co(fr(u, n), s, t.type), yf(s, u), Df(u, n.length, 1)), Wo(n, d), n[22] = d
                    }(d, this.componentDef, g, a, l);
                    if (d) if (r) Do(l, d, ["ng-version", yv.full]); else {
                        const {attrs: m, classes: E} = function v_(e) {
                            const t = [], n = [];
                            let r = 1, o = 2;
                            for (; r < e.length;) {
                                let i = e[r];
                                if ("string" == typeof i) 2 === o ? "" !== i && t.push(i, e[++r]) : 8 === o && n.push(i); else {
                                    if (!tt(o)) break;
                                    o = i
                                }
                                r++
                            }
                            return {attrs: t, classes: n}
                        }(this.componentDef.selectors[0]);
                        m && Do(l, d, m), E && E.length > 0 && oa(l, d, E.join(" "))
                    }
                    if (v = Ki(h, Q), void 0 !== n) {
                        const m = v.projection = [];
                        for (let E = 0; E < this.ngContentSelectors.length; E++) {
                            const R = n[E];
                            m.push(null != R ? Array.from(R) : null)
                        }
                    }
                    D = function Tw(e, t, n, r, o) {
                        const i = n[1], s = function ow(e, t, n) {
                            const r = de();
                            e.firstCreatePass && (n.providersResolver && n.providersResolver(n), vf(e, r, t, Ln(e, t, 1, null), n), pf(e, r));
                            const o = pr(t, e, r.directiveStart, r);
                            ve(o, t);
                            const i = We(r, t);
                            return i && ve(i, t), o
                        }(i, n, t);
                        if (r.components.push(s), e[8] = s, null !== o) for (const u of o) u(s, t);
                        if (t.contentQueries) {
                            const u = de();
                            t.contentQueries(1, s, u.directiveStart)
                        }
                        const a = de();
                        return !i.firstCreatePass || null === t.hostBindings && null === t.hostAttrs || (Lt(a.index), gf(n[1], a, 0, a.directiveStart, a.directiveEnd, t), mf(t, s)), s
                    }(C, this.componentDef, g, p, [Aw]), qo(h, g, null)
                } finally {
                    us()
                }
                return new Iw(this.componentType, D, An(v, g), g, v)
            }
        }

        class Iw extends class cv {
        } {
            constructor(t, n, r, o, i) {
                super(), this.location = r, this._rootLView = o, this._tNode = i, this.instance = n, this.hostView = this.changeDetectorRef = new ww(o), this.componentType = t
            }

            setInput(t, n) {
                const r = this._tNode.inputs;
                let o;
                if (null !== r && (o = r[t])) {
                    const i = this._rootLView;
                    xa(i[1], i, o, t, n), hf(i, this._tNode.index)
                }
            }

            get injector() {
                return new Dn(this._tNode, this._rootLView)
            }

            destroy() {
                this.hostView.destroy()
            }

            onDestroy(t) {
                this.hostView.onDestroy(t)
            }
        }

        function Aw() {
            const e = de();
            go(y()[1], e)
        }

        let Yo = null;

        function tn() {
            if (!Yo) {
                const e = z.Symbol;
                if (e && e.iterator) Yo = e.iterator; else {
                    const t = Object.getOwnPropertyNames(Map.prototype);
                    for (let n = 0; n < t.length; ++n) {
                        const r = t[n];
                        "entries" !== r && "size" !== r && Map.prototype[r] === Map.prototype.entries && (Yo = r)
                    }
                }
            }
            return Yo
        }

        function Nr(e) {
            return !!function Pa(e) {
                return null !== e && ("function" == typeof e || "object" == typeof e)
            }(e) && (Array.isArray(e) || !(e instanceof Map) && tn() in e)
        }

        function _e(e, t, n) {
            return !Object.is(e[t], n) && (e[t] = n, !0)
        }

        function qn(e, t, n, r, o, i, s, a) {
            const u = y(), l = j(), c = e + Q, d = l.firstCreatePass ? function $w(e, t, n, r, o, i, s, a, u) {
                const l = t.consts, c = Rn(t, e, 4, s || null, Rt(l, a));
                ba(t, n, c, Rt(l, u)), go(t, c);
                const d = c.tViews = Ea(2, c, r, o, i, t.directiveRegistry, t.pipeRegistry, null, t.schemas, l);
                return null !== t.queries && (t.queries.template(t, c), d.queries = t.queries.embeddedTView(c)), c
            }(c, l, u, t, n, r, o, i, s) : l.data[c];
            ct(d, !1);
            const f = u[O].createComment("");
            jo(l, u, f, d), ve(f, u), Wo(u, u[c] = _f(f, u, f, d)), co(d) && wa(l, u, d), null != s && Ca(u, d, a)
        }

        function Oa(e) {
            return hn(function Ty() {
                return A.lFrame.contextLView
            }(), Q + e)
        }

        function gt(e, t, n) {
            const r = y();
            return _e(r, gn(), t) && function $e(e, t, n, r, o, i, s, a) {
                const u = We(t, n);
                let c, l = t.inputs;
                !a && null != l && (c = l[r]) ? (xa(e, n, c, r, o), lo(t) && hf(n, t.index)) : 3 & t.type && (r = function nw(e) {
                    return "class" === e ? "className" : "for" === e ? "htmlFor" : "formaction" === e ? "formAction" : "innerHtml" === e ? "innerHTML" : "readonly" === e ? "readOnly" : "tabindex" === e ? "tabIndex" : e
                }(r), o = null != s ? s(o, t.value || "", r) : o, i.setProperty(u, r, o))
            }(j(), function re() {
                const e = A.lFrame;
                return Ki(e.tView, e.selectedIndex)
            }(), r, e, t, r[O], n, !1), gt
        }

        function Ra(e, t, n, r, o) {
            const s = o ? "class" : "style";
            xa(e, n, t.inputs[s], s, r)
        }

        function ie(e, t, n, r) {
            const o = y(), i = j(), s = Q + e, a = o[O], u = o[s] = Js(a, t, function Vy() {
                return A.lFrame.currentNamespace
            }()), l = i.firstCreatePass ? function Gw(e, t, n, r, o, i, s) {
                const a = t.consts, l = Rn(t, e, 2, o, Rt(a, i));
                return ba(t, n, l, Rt(a, s)), null !== l.attrs && Qo(l, l.attrs, !1), null !== l.mergedAttrs && Qo(l, l.mergedAttrs, !0), null !== t.queries && t.queries.elementStart(t, l), l
            }(s, i, o, 0, t, n, r) : i.data[s];
            ct(l, !0);
            const c = l.mergedAttrs;
            null !== c && Do(a, u, c);
            const d = l.classes;
            null !== d && oa(a, u, d);
            const f = l.styles;
            return null !== f && Fd(a, u, f), 64 != (64 & l.flags) && jo(i, o, u, l), 0 === function Cy() {
                return A.lFrame.elementDepthCount
            }() && ve(u, o), function Ey() {
                A.lFrame.elementDepthCount++
            }(), co(l) && (wa(i, o, l), function lf(e, t, n) {
                if (qi(t)) {
                    const o = t.directiveEnd;
                    for (let i = t.directiveStart; i < o; i++) {
                        const s = e.data[i];
                        s.contentQueries && s.contentQueries(1, n[i], i)
                    }
                }
            }(i, l, o)), null !== r && Ca(o, l), ie
        }

        function X() {
            let e = de();
            ns() ? function rs() {
                A.lFrame.isParent = !1
            }() : (e = e.parent, ct(e, !1));
            const t = e;
            !function by() {
                A.lFrame.elementDepthCount--
            }();
            const n = j();
            return n.firstCreatePass && (go(n, e), qi(e) && n.queries.elementEnd(e)), null != t.classesWithoutHost && function Uy(e) {
                return 0 != (16 & e.flags)
            }(t) && Ra(n, t, y(), t.classesWithoutHost, !0), null != t.stylesWithoutHost && function Gy(e) {
                return 0 != (32 & e.flags)
            }(t) && Ra(n, t, y(), t.stylesWithoutHost, !1), X
        }

        function La(e, t, n, r) {
            return ie(e, t, n, r), X(), La
        }

        function ja(e) {
            return !!e && "function" == typeof e.then
        }

        const qw = function $f(e) {
            return !!e && "function" == typeof e.subscribe
        };

        function Wn(e, t, n, r) {
            const o = y(), i = j(), s = de();
            return function Gf(e, t, n, r, o, i, s, a) {
                const u = co(r), c = e.firstCreatePass && bf(e), d = t[8], f = Ef(t);
                let p = !0;
                if (3 & r.type || a) {
                    const D = We(r, t), v = a ? a(D) : D, C = f.length, m = a ? R => a(ae(R[r.index])) : r.index;
                    let E = null;
                    if (!a && u && (E = function Ww(e, t, n, r) {
                        const o = e.cleanup;
                        if (null != o) for (let i = 0; i < o.length - 1; i += 2) {
                            const s = o[i];
                            if (s === n && o[i + 1] === r) {
                                const a = t[7], u = o[i + 2];
                                return a.length > u ? a[u] : null
                            }
                            "string" == typeof s && (i += 2)
                        }
                        return null
                    }(e, t, o, r.index)), null !== E) (E.__ngLastListenerFn__ || E).__ngNextListenerFn__ = i, E.__ngLastListenerFn__ = i, p = !1; else {
                        i = qf(r, t, d, i, !1);
                        const R = n.listen(v, o, i);
                        f.push(i, R), c && c.push(o, m, C, C + 1)
                    }
                } else i = qf(r, t, d, i, !1);
                const h = r.outputs;
                let g;
                if (p && null !== h && (g = h[o])) {
                    const D = g.length;
                    if (D) for (let v = 0; v < D; v += 2) {
                        const Y = t[g[v]][g[v + 1]].subscribe(i), an = f.length;
                        f.push(i, Y), c && c.push(o, r.index, an, -(an + 1))
                    }
                }
            }(i, o, o[O], s, e, t, 0, r), Wn
        }

        function zf(e, t, n, r) {
            try {
                return !1 !== n(r)
            } catch (o) {
                return Mf(e, o), !1
            }
        }

        function qf(e, t, n, r, o) {
            return function i(s) {
                if (s === Function) return r;
                Ta(2 & e.flags ? Ve(e.index, t) : t);
                let u = zf(t, 0, r, s), l = i.__ngNextListenerFn__;
                for (; l;) u = zf(t, 0, l, s) && u, l = l.__ngNextListenerFn__;
                return o && !1 === u && (s.preventDefault(), s.returnValue = !1), u
            }
        }

        function Ba(e = 1) {
            return function Fy(e) {
                return (A.lFrame.contextLView = function Py(e, t) {
                    for (; e > 0;) t = t[15], e--;
                    return t
                }(e, A.lFrame.contextLView))[8]
            }(e)
        }

        function Fe(e, t = "") {
            const n = y(), r = j(), o = e + Q, i = r.firstCreatePass ? Rn(r, o, 1, t, null) : r.data[o],
                s = n[o] = function Ks(e, t) {
                    return e.createText(t)
                }(n[O], t);
            jo(r, n, s, i), ct(i, !1)
        }

        function Ua(e) {
            return rn("", e, ""), Ua
        }

        function rn(e, t, n) {
            const r = y(), o = function Vn(e, t, n, r) {
                return _e(e, gn(), n) ? t + x(n) + r : N
            }(r, e, t, n);
            return o !== N && Mt(r, be(), o), rn
        }

        const Yn = "en-US";
        let Vp = Yn;

        class Jn {
        }

        class ch extends Jn {
            constructor(t, n) {
                super(), this._parent = n, this._bootstrapComponents = [], this.destroyCbs = [], this.componentFactoryResolver = new Na(this);
                const r = function Le(e, t) {
                    const n = e[Ol] || null;
                    if (!n && !0 === t) throw new Error(`Type ${W(e)} does not have '\u0275mod' property.`);
                    return n
                }(t);
                this._bootstrapComponents = function bt(e) {
                    return e instanceof Function ? e() : e
                }(r.bootstrap), this._r3Injector = Ud(t, n, [{provide: Jn, useValue: this}, {
                    provide: ko,
                    useValue: this.componentFactoryResolver
                }], W(t), new Set(["environment"])), this._r3Injector.resolveInjectorInitializers(), this.instance = this._r3Injector.get(t)
            }

            get injector() {
                return this._r3Injector
            }

            destroy() {
                const t = this._r3Injector;
                !t.destroyed && t.destroy(), this.destroyCbs.forEach(n => n()), this.destroyCbs = null
            }

            onDestroy(t) {
                this.destroyCbs.push(t)
            }
        }

        class Ya extends class OE {
        } {
            constructor(t) {
                super(), this.moduleType = t
            }

            create(t) {
                return new ch(this.moduleType, t)
            }
        }

        function Dh(e, t, n, r, o, i) {
            const s = t + n;
            return _e(e, s, o) ? function ht(e, t, n) {
                return e[t] = n
            }(e, s + 1, i ? r.call(i, o) : r(o)) : function Vr(e, t) {
                const n = e[t];
                return n === N ? void 0 : n
            }(e, s + 1)
        }

        function Ja(e, t) {
            const n = j();
            let r;
            const o = e + Q;
            n.firstCreatePass ? (r = function r0(e, t) {
                if (t) for (let n = t.length - 1; n >= 0; n--) {
                    const r = t[n];
                    if (e === r.name) return r
                }
            }(t, n.pipeRegistry), n.data[o] = r, r.onDestroy && (n.destroyHooks || (n.destroyHooks = [])).push(o, r.onDestroy)) : r = n.data[o];
            const i = r.factory || (r.factory = Kt(r.type)), s = Ue(L);
            try {
                const a = _o(!1), u = i();
                return _o(a), function Uw(e, t, n, r) {
                    n >= e.data.length && (e.data[n] = null, e.blueprint[n] = null), t[n] = r
                }(n, y(), o, u), u
            } finally {
                Ue(s)
            }
        }

        function Xa(e, t, n) {
            const r = e + Q, o = y(), i = hn(o, r);
            return function jr(e, t) {
                return e[1].data[t].pure
            }(o, r) ? Dh(o, function Ee() {
                const e = A.lFrame;
                let t = e.bindingRootIndex;
                return -1 === t && (t = e.bindingRootIndex = e.tView.bindingStartIndex), t
            }(), t, i.transform, n, i) : i.transform(n)
        }

        function eu(e) {
            return t => {
                setTimeout(e, void 0, t)
            }
        }

        const Tt = class l0 extends Ni {
            constructor(t = !1) {
                super(), this.__isAsync = t
            }

            emit(t) {
                super.next(t)
            }

            subscribe(t, n, r) {
                let o = t, i = n || (() => null), s = r;
                if (t && "object" == typeof t) {
                    const u = t;
                    o = u.next?.bind(u), i = u.error?.bind(u), s = u.complete?.bind(u)
                }
                this.__isAsync && (i = eu(i), o && (o = eu(o)), s && (s = eu(s)));
                const a = super.subscribe({next: o, error: i, complete: s});
                return t instanceof ut && t.add(a), a
            }
        };
        let St = (() => {
            class e {
            }

            return e.__NG_ELEMENT_ID__ = p0, e
        })();
        const d0 = St, f0 = class extends d0 {
            constructor(t, n, r) {
                super(), this._declarationLView = t, this._declarationTContainer = n, this.elementRef = r
            }

            createEmbeddedView(t, n) {
                const r = this._declarationTContainer.tViews,
                    o = zo(this._declarationLView, r, t, 16, null, r.declTNode, null, null, null, null, n || null);
                o[17] = this._declarationLView[this._declarationTContainer.index];
                const s = this._declarationLView[19];
                return null !== s && (o[19] = s.createEmbeddedView(r)), qo(r, o, t), new Ar(o)
            }
        };

        function p0() {
            return function ri(e, t) {
                return 4 & e.type ? new f0(t, e, An(e, t)) : null
            }(de(), y())
        }

        let Dt = (() => {
            class e {
            }

            return e.__NG_ELEMENT_ID__ = h0, e
        })();

        function h0() {
            return function Ih(e, t) {
                let n;
                const r = t[e.index];
                if (Xe(r)) n = r; else {
                    let o;
                    if (8 & e.type) o = ae(r); else {
                        const i = t[O];
                        o = i.createComment("");
                        const s = We(e, t);
                        Xt(i, Vo(i, s), o, function i_(e, t) {
                            return e.nextSibling(t)
                        }(i, s), !1)
                    }
                    t[e.index] = n = _f(r, t, o, e), Wo(t, n)
                }
                return new Eh(n, e, t)
            }(de(), y())
        }

        const g0 = Dt, Eh = class extends g0 {
            constructor(t, n, r) {
                super(), this._lContainer = t, this._hostTNode = n, this._hostLView = r
            }

            get element() {
                return An(this._hostTNode, this._hostLView)
            }

            get injector() {
                return new Dn(this._hostTNode, this._hostLView)
            }

            get parentInjector() {
                const t = wo(this._hostTNode, this._hostLView);
                if (sc(t)) {
                    const n = yn(t, this._hostLView), r = mn(t);
                    return new Dn(n[1].data[r + 8], n)
                }
                return new Dn(null, this._hostLView)
            }

            clear() {
                for (; this.length > 0;) this.remove(this.length - 1)
            }

            get(t) {
                const n = bh(this._lContainer);
                return null !== n && n[t] || null
            }

            get length() {
                return this._lContainer.length - 10
            }

            createEmbeddedView(t, n, r) {
                let o, i;
                "number" == typeof r ? o = r : null != r && (o = r.index, i = r.injector);
                const s = t.createEmbeddedView(n || {}, i);
                return this.insert(s, o), s
            }

            createComponent(t, n, r, o, i) {
                const s = t && !function gr(e) {
                    return "function" == typeof e
                }(t);
                let a;
                if (s) a = n; else {
                    const d = n || {};
                    a = d.index, r = d.injector, o = d.projectableNodes, i = d.environmentInjector || d.ngModuleRef
                }
                const u = s ? t : new xr(G(t)), l = r || this.parentInjector;
                if (!i && null == u.ngModule) {
                    const f = (s ? l : this.parentInjector).get(Tn, null);
                    f && (i = f)
                }
                const c = u.create(l, o, void 0, i);
                return this.insert(c.hostView, a), c
            }

            insert(t, n) {
                const r = t._lView, o = r[1];
                if (function wy(e) {
                    return Xe(e[3])
                }(r)) {
                    const c = this.indexOf(t);
                    if (-1 !== c) this.detach(c); else {
                        const d = r[3], f = new Eh(d, d[6], d[3]);
                        f.detach(f.indexOf(t))
                    }
                }
                const i = this._adjustIndex(n), s = this._lContainer;
                !function e_(e, t, n, r) {
                    const o = 10 + r, i = n.length;
                    r > 0 && (n[o - 1][4] = t), r < i - 10 ? (t[4] = n[o], yc(n, 10 + r, t)) : (n.push(t), t[4] = null), t[3] = n;
                    const s = t[17];
                    null !== s && n !== s && function t_(e, t) {
                        const n = e[9];
                        t[16] !== t[3][3][16] && (e[2] = !0), null === n ? e[9] = [t] : n.push(t)
                    }(s, t);
                    const a = t[19];
                    null !== a && a.insertView(e), t[2] |= 64
                }(o, r, s, i);
                const a = na(i, s), u = r[O], l = Vo(u, s[7]);
                return null !== l && function Kv(e, t, n, r, o, i) {
                    r[0] = o, r[6] = t, Tr(e, r, n, 1, o, i)
                }(o, s[6], u, r, l, a), t.attachToViewContainerRef(), yc(nu(s), i, t), t
            }

            move(t, n) {
                return this.insert(t, n)
            }

            indexOf(t) {
                const n = bh(this._lContainer);
                return null !== n ? n.indexOf(t) : -1
            }

            remove(t) {
                const n = this._adjustIndex(t, -1), r = Xs(this._lContainer, n);
                r && (bo(nu(this._lContainer), n), _d(r[1], r))
            }

            detach(t) {
                const n = this._adjustIndex(t, -1), r = Xs(this._lContainer, n);
                return r && null != bo(nu(this._lContainer), n) ? new Ar(r) : null
            }

            _adjustIndex(t, n = 0) {
                return t ?? this.length + n
            }
        };

        function bh(e) {
            return e[8]
        }

        function nu(e) {
            return e[8] || (e[8] = [])
        }

        function ii(...e) {
        }

        const Zh = new V("Application Initializer");
        let si = (() => {
            class e {
                constructor(n) {
                    this.appInits = n, this.resolve = ii, this.reject = ii, this.initialized = !1, this.done = !1, this.donePromise = new Promise((r, o) => {
                        this.resolve = r, this.reject = o
                    })
                }

                runInitializers() {
                    if (this.initialized) return;
                    const n = [], r = () => {
                        this.done = !0, this.resolve()
                    };
                    if (this.appInits) for (let o = 0; o < this.appInits.length; o++) {
                        const i = this.appInits[o]();
                        if (ja(i)) n.push(i); else if (qw(i)) {
                            const s = new Promise((a, u) => {
                                i.subscribe({complete: a, error: u})
                            });
                            n.push(s)
                        }
                    }
                    Promise.all(n).then(() => {
                        r()
                    }).catch(o => {
                        this.reject(o)
                    }), 0 === n.length && r(), this.initialized = !0
                }
            }

            return e.\u0275fac = function (n) {
                return new (n || e)(U(Zh, 8))
            }, e.\u0275prov = K({token: e, factory: e.\u0275fac, providedIn: "root"}), e
        })();
        const $r = new V("AppId", {
            providedIn: "root", factory: function Yh() {
                return `${fu()}${fu()}${fu()}`
            }
        });

        function fu() {
            return String.fromCharCode(97 + Math.floor(25 * Math.random()))
        }

        const Kh = new V("Platform Initializer"),
            Jh = new V("Platform ID", {providedIn: "platform", factory: () => "unknown"}),
            Q0 = new V("appBootstrapListener"), At = new V("LocaleId", {
                providedIn: "root", factory: () => function hD(e, t = S.Default) {
                    return "number" != typeof t && (t = 0 | (t.optional && 8) | (t.host && 1) | (t.self && 2) | (t.skipSelf && 4)), U(e, t)
                }(At, S.Optional | S.SkipSelf) || function Z0() {
                    return typeof $localize < "u" && $localize.locale || Yn
                }()
            }), eb = (() => Promise.resolve(0))();

        function pu(e) {
            typeof Zone > "u" ? eb.then(() => {
                e && e.apply(null, null)
            }) : Zone.current.scheduleMicroTask("scheduleMicrotask", e)
        }

        class me {
            constructor({
                            enableLongStackTrace: t = !1,
                            shouldCoalesceEventChangeDetection: n = !1,
                            shouldCoalesceRunChangeDetection: r = !1
                        }) {
                if (this.hasPendingMacrotasks = !1, this.hasPendingMicrotasks = !1, this.isStable = !0, this.onUnstable = new Tt(!1), this.onMicrotaskEmpty = new Tt(!1), this.onStable = new Tt(!1), this.onError = new Tt(!1), typeof Zone > "u") throw new T(908, !1);
                Zone.assertZonePatched();
                const o = this;
                if (o._nesting = 0, o._outer = o._inner = Zone.current, Zone.AsyncStackTaggingZoneSpec) {
                    const i = Zone.AsyncStackTaggingZoneSpec;
                    o._inner = o._inner.fork(new i("Angular"))
                }
                Zone.TaskTrackingZoneSpec && (o._inner = o._inner.fork(new Zone.TaskTrackingZoneSpec)), t && Zone.longStackTraceZoneSpec && (o._inner = o._inner.fork(Zone.longStackTraceZoneSpec)), o.shouldCoalesceEventChangeDetection = !r && n, o.shouldCoalesceRunChangeDetection = r, o.lastRequestAnimationFrameId = -1, o.nativeRequestAnimationFrame = function tb() {
                    let e = z.requestAnimationFrame, t = z.cancelAnimationFrame;
                    if (typeof Zone < "u" && e && t) {
                        const n = e[Zone.__symbol__("OriginalDelegate")];
                        n && (e = n);
                        const r = t[Zone.__symbol__("OriginalDelegate")];
                        r && (t = r)
                    }
                    return {nativeRequestAnimationFrame: e, nativeCancelAnimationFrame: t}
                }().nativeRequestAnimationFrame, function ob(e) {
                    const t = () => {
                        !function rb(e) {
                            e.isCheckStableRunning || -1 !== e.lastRequestAnimationFrameId || (e.lastRequestAnimationFrameId = e.nativeRequestAnimationFrame.call(z, () => {
                                e.fakeTopEventTask || (e.fakeTopEventTask = Zone.root.scheduleEventTask("fakeTopEventTask", () => {
                                    e.lastRequestAnimationFrameId = -1, gu(e), e.isCheckStableRunning = !0, hu(e), e.isCheckStableRunning = !1
                                }, void 0, () => {
                                }, () => {
                                })), e.fakeTopEventTask.invoke()
                            }), gu(e))
                        }(e)
                    };
                    e._inner = e._inner.fork({
                        name: "angular",
                        properties: {isAngularZone: !0},
                        onInvokeTask: (n, r, o, i, s, a) => {
                            try {
                                return tg(e), n.invokeTask(o, i, s, a)
                            } finally {
                                (e.shouldCoalesceEventChangeDetection && "eventTask" === i.type || e.shouldCoalesceRunChangeDetection) && t(), ng(e)
                            }
                        },
                        onInvoke: (n, r, o, i, s, a, u) => {
                            try {
                                return tg(e), n.invoke(o, i, s, a, u)
                            } finally {
                                e.shouldCoalesceRunChangeDetection && t(), ng(e)
                            }
                        },
                        onHasTask: (n, r, o, i) => {
                            n.hasTask(o, i), r === o && ("microTask" == i.change ? (e._hasPendingMicrotasks = i.microTask, gu(e), hu(e)) : "macroTask" == i.change && (e.hasPendingMacrotasks = i.macroTask))
                        },
                        onHandleError: (n, r, o, i) => (n.handleError(o, i), e.runOutsideAngular(() => e.onError.emit(i)), !1)
                    })
                }(o)
            }

            static isInAngularZone() {
                return typeof Zone < "u" && !0 === Zone.current.get("isAngularZone")
            }

            static assertInAngularZone() {
                if (!me.isInAngularZone()) throw new T(909, !1)
            }

            static assertNotInAngularZone() {
                if (me.isInAngularZone()) throw new T(909, !1)
            }

            run(t, n, r) {
                return this._inner.run(t, n, r)
            }

            runTask(t, n, r, o) {
                const i = this._inner, s = i.scheduleEventTask("NgZoneEvent: " + o, t, nb, ii, ii);
                try {
                    return i.runTask(s, n, r)
                } finally {
                    i.cancelTask(s)
                }
            }

            runGuarded(t, n, r) {
                return this._inner.runGuarded(t, n, r)
            }

            runOutsideAngular(t) {
                return this._outer.run(t)
            }
        }

        const nb = {};

        function hu(e) {
            if (0 == e._nesting && !e.hasPendingMicrotasks && !e.isStable) try {
                e._nesting++, e.onMicrotaskEmpty.emit(null)
            } finally {
                if (e._nesting--, !e.hasPendingMicrotasks) try {
                    e.runOutsideAngular(() => e.onStable.emit(null))
                } finally {
                    e.isStable = !0
                }
            }
        }

        function gu(e) {
            e.hasPendingMicrotasks = !!(e._hasPendingMicrotasks || (e.shouldCoalesceEventChangeDetection || e.shouldCoalesceRunChangeDetection) && -1 !== e.lastRequestAnimationFrameId)
        }

        function tg(e) {
            e._nesting++, e.isStable && (e.isStable = !1, e.onUnstable.emit(null))
        }

        function ng(e) {
            e._nesting--, hu(e)
        }

        class ib {
            constructor() {
                this.hasPendingMicrotasks = !1, this.hasPendingMacrotasks = !1, this.isStable = !0, this.onUnstable = new Tt, this.onMicrotaskEmpty = new Tt, this.onStable = new Tt, this.onError = new Tt
            }

            run(t, n, r) {
                return t.apply(n, r)
            }

            runGuarded(t, n, r) {
                return t.apply(n, r)
            }

            runOutsideAngular(t) {
                return t()
            }

            runTask(t, n, r, o) {
                return t.apply(n, r)
            }
        }

        const rg = new V(""), ai = new V("");
        let Du, mu = (() => {
            class e {
                constructor(n, r, o) {
                    this._ngZone = n, this.registry = r, this._pendingCount = 0, this._isZoneStable = !0, this._didWork = !1, this._callbacks = [], this.taskTrackingZone = null, Du || (function sb(e) {
                        Du = e
                    }(o), o.addToWindow(r)), this._watchAngularEvents(), n.run(() => {
                        this.taskTrackingZone = typeof Zone > "u" ? null : Zone.current.get("TaskTrackingZone")
                    })
                }

                _watchAngularEvents() {
                    this._ngZone.onUnstable.subscribe({
                        next: () => {
                            this._didWork = !0, this._isZoneStable = !1
                        }
                    }), this._ngZone.runOutsideAngular(() => {
                        this._ngZone.onStable.subscribe({
                            next: () => {
                                me.assertNotInAngularZone(), pu(() => {
                                    this._isZoneStable = !0, this._runCallbacksIfReady()
                                })
                            }
                        })
                    })
                }

                increasePendingRequestCount() {
                    return this._pendingCount += 1, this._didWork = !0, this._pendingCount
                }

                decreasePendingRequestCount() {
                    if (this._pendingCount -= 1, this._pendingCount < 0) throw new Error("pending async requests below zero");
                    return this._runCallbacksIfReady(), this._pendingCount
                }

                isStable() {
                    return this._isZoneStable && 0 === this._pendingCount && !this._ngZone.hasPendingMacrotasks
                }

                _runCallbacksIfReady() {
                    if (this.isStable()) pu(() => {
                        for (; 0 !== this._callbacks.length;) {
                            let n = this._callbacks.pop();
                            clearTimeout(n.timeoutId), n.doneCb(this._didWork)
                        }
                        this._didWork = !1
                    }); else {
                        let n = this.getPendingTasks();
                        this._callbacks = this._callbacks.filter(r => !r.updateCb || !r.updateCb(n) || (clearTimeout(r.timeoutId), !1)), this._didWork = !0
                    }
                }

                getPendingTasks() {
                    return this.taskTrackingZone ? this.taskTrackingZone.macroTasks.map(n => ({
                        source: n.source,
                        creationLocation: n.creationLocation,
                        data: n.data
                    })) : []
                }

                addCallback(n, r, o) {
                    let i = -1;
                    r && r > 0 && (i = setTimeout(() => {
                        this._callbacks = this._callbacks.filter(s => s.timeoutId !== i), n(this._didWork, this.getPendingTasks())
                    }, r)), this._callbacks.push({doneCb: n, timeoutId: i, updateCb: o})
                }

                whenStable(n, r, o) {
                    if (o && !this.taskTrackingZone) throw new Error('Task tracking zone is required when passing an update callback to whenStable(). Is "zone.js/plugins/task-tracking" loaded?');
                    this.addCallback(n, r, o), this._runCallbacksIfReady()
                }

                getPendingRequestCount() {
                    return this._pendingCount
                }

                registerApplication(n) {
                    this.registry.registerApplication(n, this)
                }

                unregisterApplication(n) {
                    this.registry.unregisterApplication(n)
                }

                findProviders(n, r, o) {
                    return []
                }
            }

            return e.\u0275fac = function (n) {
                return new (n || e)(U(me), U(yu), U(ai))
            }, e.\u0275prov = K({token: e, factory: e.\u0275fac}), e
        })(), yu = (() => {
            class e {
                constructor() {
                    this._applications = new Map
                }

                registerApplication(n, r) {
                    this._applications.set(n, r)
                }

                unregisterApplication(n) {
                    this._applications.delete(n)
                }

                unregisterAllApplications() {
                    this._applications.clear()
                }

                getTestability(n) {
                    return this._applications.get(n) || null
                }

                getAllTestabilities() {
                    return Array.from(this._applications.values())
                }

                getAllRootElements() {
                    return Array.from(this._applications.keys())
                }

                findTestabilityInTree(n, r = !0) {
                    return Du?.findTestabilityInTree(this, n, r) ?? null
                }
            }

            return e.\u0275fac = function (n) {
                return new (n || e)
            }, e.\u0275prov = K({token: e, factory: e.\u0275fac, providedIn: "platform"}), e
        })(), Ht = null;
        const og = new V("AllowMultipleToken"), vu = new V("PlatformDestroyListeners");

        function sg(e, t, n = []) {
            const r = `Platform: ${t}`, o = new V(r);
            return (i = []) => {
                let s = _u();
                if (!s || s.injector.get(og, !1)) {
                    const a = [...n, ...i, {provide: o, useValue: !0}];
                    e ? e(a) : function lb(e) {
                        if (Ht && !Ht.get(og, !1)) throw new T(400, !1);
                        Ht = e;
                        const t = e.get(ug);
                        (function ig(e) {
                            const t = e.get(Kh, null);
                            t && t.forEach(n => n())
                        })(e)
                    }(function ag(e = [], t) {
                        return en.create({
                            name: t,
                            providers: [{provide: Fs, useValue: "platform"}, {
                                provide: vu,
                                useValue: new Set([() => Ht = null])
                            }, ...e]
                        })
                    }(a, r))
                }
                return function db(e) {
                    const t = _u();
                    if (!t) throw new T(401, !1);
                    return t
                }()
            }
        }

        function _u() {
            return Ht?.get(ug) ?? null
        }

        let ug = (() => {
            class e {
                constructor(n) {
                    this._injector = n, this._modules = [], this._destroyListeners = [], this._destroyed = !1
                }

                bootstrapModuleFactory(n, r) {
                    const o = function fb(e, t) {
                        let n;
                        return n = "noop" === e ? new ib : ("zone.js" === e ? void 0 : e) || new me(t), n
                    }(r?.ngZone, function lg(e) {
                        return {
                            enableLongStackTrace: !1,
                            shouldCoalesceEventChangeDetection: !(!e || !e.ngZoneEventCoalescing) || !1,
                            shouldCoalesceRunChangeDetection: !(!e || !e.ngZoneRunCoalescing) || !1
                        }
                    }(r)), i = [{provide: me, useValue: o}];
                    return o.run(() => {
                        const s = en.create({providers: i, parent: this.injector, name: n.moduleType.name}),
                            a = n.create(s), u = a.injector.get(Nn, null);
                        if (!u) throw new T(402, !1);
                        return o.runOutsideAngular(() => {
                            const l = o.onError.subscribe({
                                next: c => {
                                    u.handleError(c)
                                }
                            });
                            a.onDestroy(() => {
                                ui(this._modules, a), l.unsubscribe()
                            })
                        }), function cg(e, t, n) {
                            try {
                                const r = n();
                                return ja(r) ? r.catch(o => {
                                    throw t.runOutsideAngular(() => e.handleError(o)), o
                                }) : r
                            } catch (r) {
                                throw t.runOutsideAngular(() => e.handleError(r)), r
                            }
                        }(u, o, () => {
                            const l = a.injector.get(si);
                            return l.runInitializers(), l.donePromise.then(() => (function jp(e) {
                                Re(e, "Expected localeId to be defined"), "string" == typeof e && (Vp = e.toLowerCase().replace(/_/g, "-"))
                            }(a.injector.get(At, Yn) || Yn), this._moduleDoBootstrap(a), a))
                        })
                    })
                }

                bootstrapModule(n, r = []) {
                    const o = dg({}, r);
                    return function ab(e, t, n) {
                        const r = new Ya(n);
                        return Promise.resolve(r)
                    }(0, 0, n).then(i => this.bootstrapModuleFactory(i, o))
                }

                _moduleDoBootstrap(n) {
                    const r = n.injector.get(wu);
                    if (n._bootstrapComponents.length > 0) n._bootstrapComponents.forEach(o => r.bootstrap(o)); else {
                        if (!n.instance.ngDoBootstrap) throw new T(403, !1);
                        n.instance.ngDoBootstrap(r)
                    }
                    this._modules.push(n)
                }

                onDestroy(n) {
                    this._destroyListeners.push(n)
                }

                get injector() {
                    return this._injector
                }

                destroy() {
                    if (this._destroyed) throw new T(404, !1);
                    this._modules.slice().forEach(r => r.destroy()), this._destroyListeners.forEach(r => r());
                    const n = this._injector.get(vu, null);
                    n && (n.forEach(r => r()), n.clear()), this._destroyed = !0
                }

                get destroyed() {
                    return this._destroyed
                }
            }

            return e.\u0275fac = function (n) {
                return new (n || e)(U(en))
            }, e.\u0275prov = K({token: e, factory: e.\u0275fac, providedIn: "platform"}), e
        })();

        function dg(e, t) {
            return Array.isArray(t) ? t.reduce(dg, e) : {...e, ...t}
        }

        let wu = (() => {
            class e {
                constructor(n, r, o) {
                    this._zone = n, this._injector = r, this._exceptionHandler = o, this._bootstrapListeners = [], this._views = [], this._runningTick = !1, this._stable = !0, this._destroyed = !1, this._destroyListeners = [], this.componentTypes = [], this.components = [], this._onMicrotaskEmptySubscription = this._zone.onMicrotaskEmpty.subscribe({
                        next: () => {
                            this._zone.run(() => {
                                this.tick()
                            })
                        }
                    });
                    const i = new Se(a => {
                        this._stable = this._zone.isStable && !this._zone.hasPendingMacrotasks && !this._zone.hasPendingMicrotasks, this._zone.runOutsideAngular(() => {
                            a.next(this._stable), a.complete()
                        })
                    }), s = new Se(a => {
                        let u;
                        this._zone.runOutsideAngular(() => {
                            u = this._zone.onStable.subscribe(() => {
                                me.assertNotInAngularZone(), pu(() => {
                                    !this._stable && !this._zone.hasPendingMacrotasks && !this._zone.hasPendingMicrotasks && (this._stable = !0, a.next(!0))
                                })
                            })
                        });
                        const l = this._zone.onUnstable.subscribe(() => {
                            me.assertInAngularZone(), this._stable && (this._stable = !1, this._zone.runOutsideAngular(() => {
                                a.next(!1)
                            }))
                        });
                        return () => {
                            u.unsubscribe(), l.unsubscribe()
                        }
                    });
                    this.isStable = Gm(i, s.pipe(function zm(e = {}) {
                        const {
                            connector: t = (() => new Ni),
                            resetOnError: n = !0,
                            resetOnComplete: r = !0,
                            resetOnRefCountZero: o = !0
                        } = e;
                        return i => {
                            let s, a, u, l = 0, c = !1, d = !1;
                            const f = () => {
                                a?.unsubscribe(), a = void 0
                            }, p = () => {
                                f(), s = u = void 0, c = d = !1
                            }, h = () => {
                                const g = s;
                                p(), g?.unsubscribe()
                            };
                            return rr((g, D) => {
                                l++, !d && !c && f();
                                const v = u = u ?? t();
                                D.add(() => {
                                    l--, 0 === l && !d && !c && (a = Oi(h, o))
                                }), v.subscribe(D), !s && l > 0 && (s = new nr({
                                    next: C => v.next(C), error: C => {
                                        d = !0, f(), a = Oi(p, n, C), v.error(C)
                                    }, complete: () => {
                                        c = !0, f(), a = Oi(p, r), v.complete()
                                    }
                                }), qt(g).subscribe(s))
                            })(i)
                        }
                    }()))
                }

                get destroyed() {
                    return this._destroyed
                }

                get injector() {
                    return this._injector
                }

                bootstrap(n, r) {
                    const o = n instanceof ed;
                    if (!this._injector.get(si).done) throw!o && function Hr(e) {
                        const t = G(e) || we(e) || Ce(e);
                        return null !== t && t.standalone
                    }(n), new T(405, false);
                    let s;
                    s = o ? n : this._injector.get(ko).resolveComponentFactory(n), this.componentTypes.push(s.componentType);
                    const a = function ub(e) {
                            return e.isBoundToModule
                        }(s) ? void 0 : this._injector.get(Jn), l = s.create(en.NULL, [], r || s.selector, a),
                        c = l.location.nativeElement, d = l.injector.get(rg, null);
                    return d?.registerApplication(c), l.onDestroy(() => {
                        this.detachView(l.hostView), ui(this.components, l), d?.unregisterApplication(c)
                    }), this._loadComponent(l), l
                }

                tick() {
                    if (this._runningTick) throw new T(101, !1);
                    try {
                        this._runningTick = !0;
                        for (let n of this._views) n.detectChanges()
                    } catch (n) {
                        this._zone.runOutsideAngular(() => this._exceptionHandler.handleError(n))
                    } finally {
                        this._runningTick = !1
                    }
                }

                attachView(n) {
                    const r = n;
                    this._views.push(r), r.attachToAppRef(this)
                }

                detachView(n) {
                    const r = n;
                    ui(this._views, r), r.detachFromAppRef()
                }

                _loadComponent(n) {
                    this.attachView(n.hostView), this.tick(), this.components.push(n), this._injector.get(Q0, []).concat(this._bootstrapListeners).forEach(o => o(n))
                }

                ngOnDestroy() {
                    if (!this._destroyed) try {
                        this._destroyListeners.forEach(n => n()), this._views.slice().forEach(n => n.destroy()), this._onMicrotaskEmptySubscription.unsubscribe()
                    } finally {
                        this._destroyed = !0, this._views = [], this._bootstrapListeners = [], this._destroyListeners = []
                    }
                }

                onDestroy(n) {
                    return this._destroyListeners.push(n), () => ui(this._destroyListeners, n)
                }

                destroy() {
                    if (this._destroyed) throw new T(406, !1);
                    const n = this._injector;
                    n.destroy && !n.destroyed && n.destroy()
                }

                get viewCount() {
                    return this._views.length
                }

                warnIfDestroyed() {
                }
            }

            return e.\u0275fac = function (n) {
                return new (n || e)(U(me), U(Tn), U(Nn))
            }, e.\u0275prov = K({token: e, factory: e.\u0275fac, providedIn: "root"}), e
        })();

        function ui(e, t) {
            const n = e.indexOf(t);
            n > -1 && e.splice(n, 1)
        }

        let pg = !0;

        class Dg {
            constructor() {
            }

            supports(t) {
                return Nr(t)
            }

            create(t) {
                return new Eb(t)
            }
        }

        const Cb = (e, t) => t;

        class Eb {
            constructor(t) {
                this.length = 0, this._linkedRecords = null, this._unlinkedRecords = null, this._previousItHead = null, this._itHead = null, this._itTail = null, this._additionsHead = null, this._additionsTail = null, this._movesHead = null, this._movesTail = null, this._removalsHead = null, this._removalsTail = null, this._identityChangesHead = null, this._identityChangesTail = null, this._trackByFn = t || Cb
            }

            forEachItem(t) {
                let n;
                for (n = this._itHead; null !== n; n = n._next) t(n)
            }

            forEachOperation(t) {
                let n = this._itHead, r = this._removalsHead, o = 0, i = null;
                for (; n || r;) {
                    const s = !r || n && n.currentIndex < _g(r, o, i) ? n : r, a = _g(s, o, i), u = s.currentIndex;
                    if (s === r) o--, r = r._nextRemoved; else if (n = n._next, null == s.previousIndex) o++; else {
                        i || (i = []);
                        const l = a - o, c = u - o;
                        if (l != c) {
                            for (let f = 0; f < l; f++) {
                                const p = f < i.length ? i[f] : i[f] = 0, h = p + f;
                                c <= h && h < l && (i[f] = p + 1)
                            }
                            i[s.previousIndex] = c - l
                        }
                    }
                    a !== u && t(s, a, u)
                }
            }

            forEachPreviousItem(t) {
                let n;
                for (n = this._previousItHead; null !== n; n = n._nextPrevious) t(n)
            }

            forEachAddedItem(t) {
                let n;
                for (n = this._additionsHead; null !== n; n = n._nextAdded) t(n)
            }

            forEachMovedItem(t) {
                let n;
                for (n = this._movesHead; null !== n; n = n._nextMoved) t(n)
            }

            forEachRemovedItem(t) {
                let n;
                for (n = this._removalsHead; null !== n; n = n._nextRemoved) t(n)
            }

            forEachIdentityChange(t) {
                let n;
                for (n = this._identityChangesHead; null !== n; n = n._nextIdentityChange) t(n)
            }

            diff(t) {
                if (null == t && (t = []), !Nr(t)) throw new T(900, !1);
                return this.check(t) ? this : null
            }

            onDestroy() {
            }

            check(t) {
                this._reset();
                let o, i, s, n = this._itHead, r = !1;
                if (Array.isArray(t)) {
                    this.length = t.length;
                    for (let a = 0; a < this.length; a++) i = t[a], s = this._trackByFn(a, i), null !== n && Object.is(n.trackById, s) ? (r && (n = this._verifyReinsertion(n, i, s, a)), Object.is(n.item, i) || this._addIdentityChange(n, i)) : (n = this._mismatch(n, i, s, a), r = !0), n = n._next
                } else o = 0, function Vw(e, t) {
                    if (Array.isArray(e)) for (let n = 0; n < e.length; n++) t(e[n]); else {
                        const n = e[tn()]();
                        let r;
                        for (; !(r = n.next()).done;) t(r.value)
                    }
                }(t, a => {
                    s = this._trackByFn(o, a), null !== n && Object.is(n.trackById, s) ? (r && (n = this._verifyReinsertion(n, a, s, o)), Object.is(n.item, a) || this._addIdentityChange(n, a)) : (n = this._mismatch(n, a, s, o), r = !0), n = n._next, o++
                }), this.length = o;
                return this._truncate(n), this.collection = t, this.isDirty
            }

            get isDirty() {
                return null !== this._additionsHead || null !== this._movesHead || null !== this._removalsHead || null !== this._identityChangesHead
            }

            _reset() {
                if (this.isDirty) {
                    let t;
                    for (t = this._previousItHead = this._itHead; null !== t; t = t._next) t._nextPrevious = t._next;
                    for (t = this._additionsHead; null !== t; t = t._nextAdded) t.previousIndex = t.currentIndex;
                    for (this._additionsHead = this._additionsTail = null, t = this._movesHead; null !== t; t = t._nextMoved) t.previousIndex = t.currentIndex;
                    this._movesHead = this._movesTail = null, this._removalsHead = this._removalsTail = null, this._identityChangesHead = this._identityChangesTail = null
                }
            }

            _mismatch(t, n, r, o) {
                let i;
                return null === t ? i = this._itTail : (i = t._prev, this._remove(t)), null !== (t = null === this._unlinkedRecords ? null : this._unlinkedRecords.get(r, null)) ? (Object.is(t.item, n) || this._addIdentityChange(t, n), this._reinsertAfter(t, i, o)) : null !== (t = null === this._linkedRecords ? null : this._linkedRecords.get(r, o)) ? (Object.is(t.item, n) || this._addIdentityChange(t, n), this._moveAfter(t, i, o)) : t = this._addAfter(new bb(n, r), i, o), t
            }

            _verifyReinsertion(t, n, r, o) {
                let i = null === this._unlinkedRecords ? null : this._unlinkedRecords.get(r, null);
                return null !== i ? t = this._reinsertAfter(i, t._prev, o) : t.currentIndex != o && (t.currentIndex = o, this._addToMoves(t, o)), t
            }

            _truncate(t) {
                for (; null !== t;) {
                    const n = t._next;
                    this._addToRemovals(this._unlink(t)), t = n
                }
                null !== this._unlinkedRecords && this._unlinkedRecords.clear(), null !== this._additionsTail && (this._additionsTail._nextAdded = null), null !== this._movesTail && (this._movesTail._nextMoved = null), null !== this._itTail && (this._itTail._next = null), null !== this._removalsTail && (this._removalsTail._nextRemoved = null), null !== this._identityChangesTail && (this._identityChangesTail._nextIdentityChange = null)
            }

            _reinsertAfter(t, n, r) {
                null !== this._unlinkedRecords && this._unlinkedRecords.remove(t);
                const o = t._prevRemoved, i = t._nextRemoved;
                return null === o ? this._removalsHead = i : o._nextRemoved = i, null === i ? this._removalsTail = o : i._prevRemoved = o, this._insertAfter(t, n, r), this._addToMoves(t, r), t
            }

            _moveAfter(t, n, r) {
                return this._unlink(t), this._insertAfter(t, n, r), this._addToMoves(t, r), t
            }

            _addAfter(t, n, r) {
                return this._insertAfter(t, n, r), this._additionsTail = null === this._additionsTail ? this._additionsHead = t : this._additionsTail._nextAdded = t, t
            }

            _insertAfter(t, n, r) {
                const o = null === n ? this._itHead : n._next;
                return t._next = o, t._prev = n, null === o ? this._itTail = t : o._prev = t, null === n ? this._itHead = t : n._next = t, null === this._linkedRecords && (this._linkedRecords = new vg), this._linkedRecords.put(t), t.currentIndex = r, t
            }

            _remove(t) {
                return this._addToRemovals(this._unlink(t))
            }

            _unlink(t) {
                null !== this._linkedRecords && this._linkedRecords.remove(t);
                const n = t._prev, r = t._next;
                return null === n ? this._itHead = r : n._next = r, null === r ? this._itTail = n : r._prev = n, t
            }

            _addToMoves(t, n) {
                return t.previousIndex === n || (this._movesTail = null === this._movesTail ? this._movesHead = t : this._movesTail._nextMoved = t), t
            }

            _addToRemovals(t) {
                return null === this._unlinkedRecords && (this._unlinkedRecords = new vg), this._unlinkedRecords.put(t), t.currentIndex = null, t._nextRemoved = null, null === this._removalsTail ? (this._removalsTail = this._removalsHead = t, t._prevRemoved = null) : (t._prevRemoved = this._removalsTail, this._removalsTail = this._removalsTail._nextRemoved = t), t
            }

            _addIdentityChange(t, n) {
                return t.item = n, this._identityChangesTail = null === this._identityChangesTail ? this._identityChangesHead = t : this._identityChangesTail._nextIdentityChange = t, t
            }
        }

        class bb {
            constructor(t, n) {
                this.item = t, this.trackById = n, this.currentIndex = null, this.previousIndex = null, this._nextPrevious = null, this._prev = null, this._next = null, this._prevDup = null, this._nextDup = null, this._prevRemoved = null, this._nextRemoved = null, this._nextAdded = null, this._nextMoved = null, this._nextIdentityChange = null
            }
        }

        class Ib {
            constructor() {
                this._head = null, this._tail = null
            }

            add(t) {
                null === this._head ? (this._head = this._tail = t, t._nextDup = null, t._prevDup = null) : (this._tail._nextDup = t, t._prevDup = this._tail, t._nextDup = null, this._tail = t)
            }

            get(t, n) {
                let r;
                for (r = this._head; null !== r; r = r._nextDup) if ((null === n || n <= r.currentIndex) && Object.is(r.trackById, t)) return r;
                return null
            }

            remove(t) {
                const n = t._prevDup, r = t._nextDup;
                return null === n ? this._head = r : n._nextDup = r, null === r ? this._tail = n : r._prevDup = n, null === this._head
            }
        }

        class vg {
            constructor() {
                this.map = new Map
            }

            put(t) {
                const n = t.trackById;
                let r = this.map.get(n);
                r || (r = new Ib, this.map.set(n, r)), r.add(t)
            }

            get(t, n) {
                const o = this.map.get(t);
                return o ? o.get(t, n) : null
            }

            remove(t) {
                const n = t.trackById;
                return this.map.get(n).remove(t) && this.map.delete(n), t
            }

            get isEmpty() {
                return 0 === this.map.size
            }

            clear() {
                this.map.clear()
            }
        }

        function _g(e, t, n) {
            const r = e.previousIndex;
            if (null === r) return r;
            let o = 0;
            return n && r < n.length && (o = n[r]), r + t + o
        }

        function Cg() {
            return new di([new Dg])
        }

        let di = (() => {
            class e {
                constructor(n) {
                    this.factories = n
                }

                static create(n, r) {
                    if (null != r) {
                        const o = r.factories.slice();
                        n = n.concat(o)
                    }
                    return new e(n)
                }

                static extend(n) {
                    return {provide: e, useFactory: r => e.create(n, r || Cg()), deps: [[e, new So, new To]]}
                }

                find(n) {
                    const r = this.factories.find(o => o.supports(n));
                    if (null != r) return r;
                    throw new T(901, !1)
                }
            }

            return e.\u0275prov = K({token: e, providedIn: "root", factory: Cg}), e
        })();
        const xb = sg(null, "core", []);
        let Nb = (() => {
            class e {
                constructor(n) {
                }
            }

            return e.\u0275fac = function (n) {
                return new (n || e)(U(wu))
            }, e.\u0275mod = ir({type: e}), e.\u0275inj = un({}), e
        })(), fi = null;

        function Gr() {
            return fi
        }

        const Nt = new V("DocumentToken");

        class CI {
            constructor(t, n, r, o) {
                this.$implicit = t, this.ngForOf = n, this.index = r, this.count = o
            }

            get first() {
                return 0 === this.index
            }

            get last() {
                return this.index === this.count - 1
            }

            get even() {
                return this.index % 2 == 0
            }

            get odd() {
                return !this.even
            }
        }

        let Ru = (() => {
            class e {
                constructor(n, r, o) {
                    this._viewContainer = n, this._template = r, this._differs = o, this._ngForOf = null, this._ngForOfDirty = !0, this._differ = null
                }

                set ngForOf(n) {
                    this._ngForOf = n, this._ngForOfDirty = !0
                }

                set ngForTrackBy(n) {
                    this._trackByFn = n
                }

                get ngForTrackBy() {
                    return this._trackByFn
                }

                set ngForTemplate(n) {
                    n && (this._template = n)
                }

                ngDoCheck() {
                    if (this._ngForOfDirty) {
                        this._ngForOfDirty = !1;
                        const n = this._ngForOf;
                        !this._differ && n && (this._differ = this._differs.find(n).create(this.ngForTrackBy))
                    }
                    if (this._differ) {
                        const n = this._differ.diff(this._ngForOf);
                        n && this._applyChanges(n)
                    }
                }

                _applyChanges(n) {
                    const r = this._viewContainer;
                    n.forEachOperation((o, i, s) => {
                        if (null == o.previousIndex) r.createEmbeddedView(this._template, new CI(o.item, this._ngForOf, -1, -1), null === s ? void 0 : s); else if (null == s) r.remove(null === i ? void 0 : i); else if (null !== i) {
                            const a = r.get(i);
                            r.move(a, s), Rg(a, o)
                        }
                    });
                    for (let o = 0, i = r.length; o < i; o++) {
                        const a = r.get(o).context;
                        a.index = o, a.count = i, a.ngForOf = this._ngForOf
                    }
                    n.forEachIdentityChange(o => {
                        Rg(r.get(o.currentIndex), o)
                    })
                }

                static ngTemplateContextGuard(n, r) {
                    return !0
                }
            }

            return e.\u0275fac = function (n) {
                return new (n || e)(L(Dt), L(St), L(di))
            }, e.\u0275dir = Ge({
                type: e,
                selectors: [["", "ngFor", "", "ngForOf", ""]],
                inputs: {ngForOf: "ngForOf", ngForTrackBy: "ngForTrackBy", ngForTemplate: "ngForTemplate"},
                standalone: !0
            }), e
        })();

        function Rg(e, t) {
            e.context.$implicit = t.item
        }

        let Lg = (() => {
            class e {
                constructor(n, r) {
                    this._viewContainer = n, this._context = new bI, this._thenTemplateRef = null, this._elseTemplateRef = null, this._thenViewRef = null, this._elseViewRef = null, this._thenTemplateRef = r
                }

                set ngIf(n) {
                    this._context.$implicit = this._context.ngIf = n, this._updateView()
                }

                set ngIfThen(n) {
                    kg("ngIfThen", n), this._thenTemplateRef = n, this._thenViewRef = null, this._updateView()
                }

                set ngIfElse(n) {
                    kg("ngIfElse", n), this._elseTemplateRef = n, this._elseViewRef = null, this._updateView()
                }

                _updateView() {
                    this._context.$implicit ? this._thenViewRef || (this._viewContainer.clear(), this._elseViewRef = null, this._thenTemplateRef && (this._thenViewRef = this._viewContainer.createEmbeddedView(this._thenTemplateRef, this._context))) : this._elseViewRef || (this._viewContainer.clear(), this._thenViewRef = null, this._elseTemplateRef && (this._elseViewRef = this._viewContainer.createEmbeddedView(this._elseTemplateRef, this._context)))
                }

                static ngTemplateContextGuard(n, r) {
                    return !0
                }
            }

            return e.\u0275fac = function (n) {
                return new (n || e)(L(Dt), L(St))
            }, e.\u0275dir = Ge({
                type: e,
                selectors: [["", "ngIf", ""]],
                inputs: {ngIf: "ngIf", ngIfThen: "ngIfThen", ngIfElse: "ngIfElse"},
                standalone: !0
            }), e
        })();

        class bI {
            constructor() {
                this.$implicit = null, this.ngIf = null
            }
        }

        function kg(e, t) {
            if (t && !t.createEmbeddedView) throw new Error(`${e} must be a TemplateRef, but received '${W(t)}'.`)
        }

        const LI = /(?:[0-9A-Za-z\xAA\xB5\xBA\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0370-\u0374\u0376\u0377\u037A-\u037D\u037F\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u048A-\u052F\u0531-\u0556\u0559\u0560-\u0588\u05D0-\u05EA\u05EF-\u05F2\u0620-\u064A\u066E\u066F\u0671-\u06D3\u06D5\u06E5\u06E6\u06EE\u06EF\u06FA-\u06FC\u06FF\u0710\u0712-\u072F\u074D-\u07A5\u07B1\u07CA-\u07EA\u07F4\u07F5\u07FA\u0800-\u0815\u081A\u0824\u0828\u0840-\u0858\u0860-\u086A\u0870-\u0887\u0889-\u088E\u08A0-\u08C9\u0904-\u0939\u093D\u0950\u0958-\u0961\u0971-\u0980\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BD\u09CE\u09DC\u09DD\u09DF-\u09E1\u09F0\u09F1\u09FC\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A59-\u0A5C\u0A5E\u0A72-\u0A74\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABD\u0AD0\u0AE0\u0AE1\u0AF9\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3D\u0B5C\u0B5D\u0B5F-\u0B61\u0B71\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BD0\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D\u0C58-\u0C5A\u0C5D\u0C60\u0C61\u0C80\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBD\u0CDD\u0CDE\u0CE0\u0CE1\u0CF1\u0CF2\u0D04-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D\u0D4E\u0D54-\u0D56\u0D5F-\u0D61\u0D7A-\u0D7F\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0E01-\u0E30\u0E32\u0E33\u0E40-\u0E46\u0E81\u0E82\u0E84\u0E86-\u0E8A\u0E8C-\u0EA3\u0EA5\u0EA7-\u0EB0\u0EB2\u0EB3\u0EBD\u0EC0-\u0EC4\u0EC6\u0EDC-\u0EDF\u0F00\u0F40-\u0F47\u0F49-\u0F6C\u0F88-\u0F8C\u1000-\u102A\u103F\u1050-\u1055\u105A-\u105D\u1061\u1065\u1066\u106E-\u1070\u1075-\u1081\u108E\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u1380-\u138F\u13A0-\u13F5\u13F8-\u13FD\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16F1-\u16F8\u1700-\u1711\u171F-\u1731\u1740-\u1751\u1760-\u176C\u176E-\u1770\u1780-\u17B3\u17D7\u17DC\u1820-\u1878\u1880-\u1884\u1887-\u18A8\u18AA\u18B0-\u18F5\u1900-\u191E\u1950-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u1A00-\u1A16\u1A20-\u1A54\u1AA7\u1B05-\u1B33\u1B45-\u1B4C\u1B83-\u1BA0\u1BAE\u1BAF\u1BBA-\u1BE5\u1C00-\u1C23\u1C4D-\u1C4F\u1C5A-\u1C7D\u1C80-\u1C88\u1C90-\u1CBA\u1CBD-\u1CBF\u1CE9-\u1CEC\u1CEE-\u1CF3\u1CF5\u1CF6\u1CFA\u1D00-\u1DBF\u1E00-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u2071\u207F\u2090-\u209C\u2102\u2107\u210A-\u2113\u2115\u2119-\u211D\u2124\u2126\u2128\u212A-\u212D\u212F-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2183\u2184\u2C00-\u2CE4\u2CEB-\u2CEE\u2CF2\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D80-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2E2F\u3005\u3006\u3031-\u3035\u303B\u303C\u3041-\u3096\u309D-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312F\u3131-\u318E\u31A0-\u31BF\u31F0-\u31FF\u3400-\u4DBF\u4E00-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA61F\uA62A\uA62B\uA640-\uA66E\uA67F-\uA69D\uA6A0-\uA6E5\uA717-\uA71F\uA722-\uA788\uA78B-\uA7CA\uA7D0\uA7D1\uA7D3\uA7D5-\uA7D9\uA7F2-\uA801\uA803-\uA805\uA807-\uA80A\uA80C-\uA822\uA840-\uA873\uA882-\uA8B3\uA8F2-\uA8F7\uA8FB\uA8FD\uA8FE\uA90A-\uA925\uA930-\uA946\uA960-\uA97C\uA984-\uA9B2\uA9CF\uA9E0-\uA9E4\uA9E6-\uA9EF\uA9FA-\uA9FE\uAA00-\uAA28\uAA40-\uAA42\uAA44-\uAA4B\uAA60-\uAA76\uAA7A\uAA7E-\uAAAF\uAAB1\uAAB5\uAAB6\uAAB9-\uAABD\uAAC0\uAAC2\uAADB-\uAADD\uAAE0-\uAAEA\uAAF2-\uAAF4\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB5A\uAB5C-\uAB69\uAB70-\uABE2\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D\uFB1F-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE70-\uFE74\uFE76-\uFEFC\uFF21-\uFF3A\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]|\uD800[\uDC00-\uDC0B\uDC0D-\uDC26\uDC28-\uDC3A\uDC3C\uDC3D\uDC3F-\uDC4D\uDC50-\uDC5D\uDC80-\uDCFA\uDE80-\uDE9C\uDEA0-\uDED0\uDF00-\uDF1F\uDF2D-\uDF40\uDF42-\uDF49\uDF50-\uDF75\uDF80-\uDF9D\uDFA0-\uDFC3\uDFC8-\uDFCF]|\uD801[\uDC00-\uDC9D\uDCB0-\uDCD3\uDCD8-\uDCFB\uDD00-\uDD27\uDD30-\uDD63\uDD70-\uDD7A\uDD7C-\uDD8A\uDD8C-\uDD92\uDD94\uDD95\uDD97-\uDDA1\uDDA3-\uDDB1\uDDB3-\uDDB9\uDDBB\uDDBC\uDE00-\uDF36\uDF40-\uDF55\uDF60-\uDF67\uDF80-\uDF85\uDF87-\uDFB0\uDFB2-\uDFBA]|\uD802[\uDC00-\uDC05\uDC08\uDC0A-\uDC35\uDC37\uDC38\uDC3C\uDC3F-\uDC55\uDC60-\uDC76\uDC80-\uDC9E\uDCE0-\uDCF2\uDCF4\uDCF5\uDD00-\uDD15\uDD20-\uDD39\uDD80-\uDDB7\uDDBE\uDDBF\uDE00\uDE10-\uDE13\uDE15-\uDE17\uDE19-\uDE35\uDE60-\uDE7C\uDE80-\uDE9C\uDEC0-\uDEC7\uDEC9-\uDEE4\uDF00-\uDF35\uDF40-\uDF55\uDF60-\uDF72\uDF80-\uDF91]|\uD803[\uDC00-\uDC48\uDC80-\uDCB2\uDCC0-\uDCF2\uDD00-\uDD23\uDE80-\uDEA9\uDEB0\uDEB1\uDF00-\uDF1C\uDF27\uDF30-\uDF45\uDF70-\uDF81\uDFB0-\uDFC4\uDFE0-\uDFF6]|\uD804[\uDC03-\uDC37\uDC71\uDC72\uDC75\uDC83-\uDCAF\uDCD0-\uDCE8\uDD03-\uDD26\uDD44\uDD47\uDD50-\uDD72\uDD76\uDD83-\uDDB2\uDDC1-\uDDC4\uDDDA\uDDDC\uDE00-\uDE11\uDE13-\uDE2B\uDE80-\uDE86\uDE88\uDE8A-\uDE8D\uDE8F-\uDE9D\uDE9F-\uDEA8\uDEB0-\uDEDE\uDF05-\uDF0C\uDF0F\uDF10\uDF13-\uDF28\uDF2A-\uDF30\uDF32\uDF33\uDF35-\uDF39\uDF3D\uDF50\uDF5D-\uDF61]|\uD805[\uDC00-\uDC34\uDC47-\uDC4A\uDC5F-\uDC61\uDC80-\uDCAF\uDCC4\uDCC5\uDCC7\uDD80-\uDDAE\uDDD8-\uDDDB\uDE00-\uDE2F\uDE44\uDE80-\uDEAA\uDEB8\uDF00-\uDF1A\uDF40-\uDF46]|\uD806[\uDC00-\uDC2B\uDCA0-\uDCDF\uDCFF-\uDD06\uDD09\uDD0C-\uDD13\uDD15\uDD16\uDD18-\uDD2F\uDD3F\uDD41\uDDA0-\uDDA7\uDDAA-\uDDD0\uDDE1\uDDE3\uDE00\uDE0B-\uDE32\uDE3A\uDE50\uDE5C-\uDE89\uDE9D\uDEB0-\uDEF8]|\uD807[\uDC00-\uDC08\uDC0A-\uDC2E\uDC40\uDC72-\uDC8F\uDD00-\uDD06\uDD08\uDD09\uDD0B-\uDD30\uDD46\uDD60-\uDD65\uDD67\uDD68\uDD6A-\uDD89\uDD98\uDEE0-\uDEF2\uDFB0]|\uD808[\uDC00-\uDF99]|\uD809[\uDC80-\uDD43]|\uD80B[\uDF90-\uDFF0]|[\uD80C\uD81C-\uD820\uD822\uD840-\uD868\uD86A-\uD86C\uD86F-\uD872\uD874-\uD879\uD880-\uD883][\uDC00-\uDFFF]|\uD80D[\uDC00-\uDC2E]|\uD811[\uDC00-\uDE46]|\uD81A[\uDC00-\uDE38\uDE40-\uDE5E\uDE70-\uDEBE\uDED0-\uDEED\uDF00-\uDF2F\uDF40-\uDF43\uDF63-\uDF77\uDF7D-\uDF8F]|\uD81B[\uDE40-\uDE7F\uDF00-\uDF4A\uDF50\uDF93-\uDF9F\uDFE0\uDFE1\uDFE3]|\uD821[\uDC00-\uDFF7]|\uD823[\uDC00-\uDCD5\uDD00-\uDD08]|\uD82B[\uDFF0-\uDFF3\uDFF5-\uDFFB\uDFFD\uDFFE]|\uD82C[\uDC00-\uDD22\uDD50-\uDD52\uDD64-\uDD67\uDD70-\uDEFB]|\uD82F[\uDC00-\uDC6A\uDC70-\uDC7C\uDC80-\uDC88\uDC90-\uDC99]|\uD835[\uDC00-\uDC54\uDC56-\uDC9C\uDC9E\uDC9F\uDCA2\uDCA5\uDCA6\uDCA9-\uDCAC\uDCAE-\uDCB9\uDCBB\uDCBD-\uDCC3\uDCC5-\uDD05\uDD07-\uDD0A\uDD0D-\uDD14\uDD16-\uDD1C\uDD1E-\uDD39\uDD3B-\uDD3E\uDD40-\uDD44\uDD46\uDD4A-\uDD50\uDD52-\uDEA5\uDEA8-\uDEC0\uDEC2-\uDEDA\uDEDC-\uDEFA\uDEFC-\uDF14\uDF16-\uDF34\uDF36-\uDF4E\uDF50-\uDF6E\uDF70-\uDF88\uDF8A-\uDFA8\uDFAA-\uDFC2\uDFC4-\uDFCB]|\uD837[\uDF00-\uDF1E]|\uD838[\uDD00-\uDD2C\uDD37-\uDD3D\uDD4E\uDE90-\uDEAD\uDEC0-\uDEEB]|\uD839[\uDFE0-\uDFE6\uDFE8-\uDFEB\uDFED\uDFEE\uDFF0-\uDFFE]|\uD83A[\uDC00-\uDCC4\uDD00-\uDD43\uDD4B]|\uD83B[\uDE00-\uDE03\uDE05-\uDE1F\uDE21\uDE22\uDE24\uDE27\uDE29-\uDE32\uDE34-\uDE37\uDE39\uDE3B\uDE42\uDE47\uDE49\uDE4B\uDE4D-\uDE4F\uDE51\uDE52\uDE54\uDE57\uDE59\uDE5B\uDE5D\uDE5F\uDE61\uDE62\uDE64\uDE67-\uDE6A\uDE6C-\uDE72\uDE74-\uDE77\uDE79-\uDE7C\uDE7E\uDE80-\uDE89\uDE8B-\uDE9B\uDEA1-\uDEA3\uDEA5-\uDEA9\uDEAB-\uDEBB]|\uD869[\uDC00-\uDEDF\uDF00-\uDFFF]|\uD86D[\uDC00-\uDF38\uDF40-\uDFFF]|\uD86E[\uDC00-\uDC1D\uDC20-\uDFFF]|\uD873[\uDC00-\uDEA1\uDEB0-\uDFFF]|\uD87A[\uDC00-\uDFE0]|\uD87E[\uDC00-\uDE1D]|\uD884[\uDC00-\uDF4A])\S*/g;
        let Vu = (() => {
            class e {
                transform(n) {
                    if (null == n) return null;
                    if ("string" != typeof n) throw function at(e, t) {
                        return new T(2100, !1)
                    }();
                    return n.replace(LI, r => r[0].toUpperCase() + r.slice(1).toLowerCase())
                }
            }

            return e.\u0275fac = function (n) {
                return new (n || e)
            }, e.\u0275pipe = Ae({name: "titlecase", type: e, pure: !0, standalone: !0}), e
        })(), YI = (() => {
            class e {
            }

            return e.\u0275fac = function (n) {
                return new (n || e)
            }, e.\u0275mod = ir({type: e}), e.\u0275inj = un({}), e
        })();

        class Hu extends class nM extends class Ob {
        } {
            constructor() {
                super(...arguments), this.supportsDOMEvents = !0
            }
        } {
            static makeCurrent() {
                !function Pb(e) {
                    fi || (fi = e)
                }(new Hu)
            }

            onAndCancel(t, n, r) {
                return t.addEventListener(n, r, !1), () => {
                    t.removeEventListener(n, r, !1)
                }
            }

            dispatchEvent(t, n) {
                t.dispatchEvent(n)
            }

            remove(t) {
                t.parentNode && t.parentNode.removeChild(t)
            }

            createElement(t, n) {
                return (n = n || this.getDefaultDocument()).createElement(t)
            }

            createHtmlDocument() {
                return document.implementation.createHTMLDocument("fakeTitle")
            }

            getDefaultDocument() {
                return document
            }

            isElementNode(t) {
                return t.nodeType === Node.ELEMENT_NODE
            }

            isShadowRoot(t) {
                return t instanceof DocumentFragment
            }

            getGlobalEventTarget(t, n) {
                return "window" === n ? window : "document" === n ? t : "body" === n ? t.body : null
            }

            getBaseHref(t) {
                const n = function rM() {
                    return Wr = Wr || document.querySelector("base"), Wr ? Wr.getAttribute("href") : null
                }();
                return null == n ? null : function oM(e) {
                    Ci = Ci || document.createElement("a"), Ci.setAttribute("href", e);
                    const t = Ci.pathname;
                    return "/" === t.charAt(0) ? t : `/${t}`
                }(n)
            }

            resetBaseElement() {
                Wr = null
            }

            getUserAgent() {
                return window.navigator.userAgent
            }

            getCookie(t) {
                return function vI(e, t) {
                    t = encodeURIComponent(t);
                    for (const n of e.split(";")) {
                        const r = n.indexOf("="), [o, i] = -1 == r ? [n, ""] : [n.slice(0, r), n.slice(r + 1)];
                        if (o.trim() === t) return decodeURIComponent(i)
                    }
                    return null
                }(document.cookie, t)
            }
        }

        let Ci, Wr = null;
        const $g = new V("TRANSITION_ID"), sM = [{
            provide: Zh, useFactory: function iM(e, t, n) {
                return () => {
                    n.get(si).donePromise.then(() => {
                        const r = Gr(), o = t.querySelectorAll(`style[ng-transition="${e}"]`);
                        for (let i = 0; i < o.length; i++) r.remove(o[i])
                    })
                }
            }, deps: [$g, Nt, en], multi: !0
        }];
        let uM = (() => {
            class e {
                build() {
                    return new XMLHttpRequest
                }
            }

            return e.\u0275fac = function (n) {
                return new (n || e)
            }, e.\u0275prov = K({token: e, factory: e.\u0275fac}), e
        })();
        const Ei = new V("EventManagerPlugins");
        let bi = (() => {
            class e {
                constructor(n, r) {
                    this._zone = r, this._eventNameToPlugin = new Map, n.forEach(o => o.manager = this), this._plugins = n.slice().reverse()
                }

                addEventListener(n, r, o) {
                    return this._findPluginFor(r).addEventListener(n, r, o)
                }

                addGlobalEventListener(n, r, o) {
                    return this._findPluginFor(r).addGlobalEventListener(n, r, o)
                }

                getZone() {
                    return this._zone
                }

                _findPluginFor(n) {
                    const r = this._eventNameToPlugin.get(n);
                    if (r) return r;
                    const o = this._plugins;
                    for (let i = 0; i < o.length; i++) {
                        const s = o[i];
                        if (s.supports(n)) return this._eventNameToPlugin.set(n, s), s
                    }
                    throw new Error(`No event manager plugin found for event ${n}`)
                }
            }

            return e.\u0275fac = function (n) {
                return new (n || e)(U(Ei), U(me))
            }, e.\u0275prov = K({token: e, factory: e.\u0275fac}), e
        })();

        class Ug {
            constructor(t) {
                this._doc = t
            }

            addGlobalEventListener(t, n, r) {
                const o = Gr().getGlobalEventTarget(this._doc, t);
                if (!o) throw new Error(`Unsupported event target ${o} for event ${n}`);
                return this.addEventListener(o, n, r)
            }
        }

        let Gg = (() => {
            class e {
                constructor() {
                    this._stylesSet = new Set
                }

                addStyles(n) {
                    const r = new Set;
                    n.forEach(o => {
                        this._stylesSet.has(o) || (this._stylesSet.add(o), r.add(o))
                    }), this.onStylesAdded(r)
                }

                onStylesAdded(n) {
                }

                getAllStyles() {
                    return Array.from(this._stylesSet)
                }
            }

            return e.\u0275fac = function (n) {
                return new (n || e)
            }, e.\u0275prov = K({token: e, factory: e.\u0275fac}), e
        })(), Qr = (() => {
            class e extends Gg {
                constructor(n) {
                    super(), this._doc = n, this._hostNodes = new Map, this._hostNodes.set(n.head, [])
                }

                _addStylesToHost(n, r, o) {
                    n.forEach(i => {
                        const s = this._doc.createElement("style");
                        s.textContent = i, o.push(r.appendChild(s))
                    })
                }

                addHost(n) {
                    const r = [];
                    this._addStylesToHost(this._stylesSet, n, r), this._hostNodes.set(n, r)
                }

                removeHost(n) {
                    const r = this._hostNodes.get(n);
                    r && r.forEach(zg), this._hostNodes.delete(n)
                }

                onStylesAdded(n) {
                    this._hostNodes.forEach((r, o) => {
                        this._addStylesToHost(n, o, r)
                    })
                }

                ngOnDestroy() {
                    this._hostNodes.forEach(n => n.forEach(zg))
                }
            }

            return e.\u0275fac = function (n) {
                return new (n || e)(U(Nt))
            }, e.\u0275prov = K({token: e, factory: e.\u0275fac}), e
        })();

        function zg(e) {
            Gr().remove(e)
        }

        const $u = {
            svg: "http://www.w3.org/2000/svg",
            xhtml: "http://www.w3.org/1999/xhtml",
            xlink: "http://www.w3.org/1999/xlink",
            xml: "http://www.w3.org/XML/1998/namespace",
            xmlns: "http://www.w3.org/2000/xmlns/",
            math: "http://www.w3.org/1998/MathML/"
        }, Uu = /%COMP%/g;

        function Ii(e, t, n) {
            for (let r = 0; r < t.length; r++) {
                let o = t[r];
                Array.isArray(o) ? Ii(e, o, n) : (o = o.replace(Uu, e), n.push(o))
            }
            return n
        }

        function Qg(e) {
            return t => {
                if ("__ngUnwrap__" === t) return e;
                !1 === e(t) && (t.preventDefault(), t.returnValue = !1)
            }
        }

        let Gu = (() => {
            class e {
                constructor(n, r, o) {
                    this.eventManager = n, this.sharedStylesHost = r, this.appId = o, this.rendererByCompId = new Map, this.defaultRenderer = new zu(n)
                }

                createRenderer(n, r) {
                    if (!n || !r) return this.defaultRenderer;
                    switch (r.encapsulation) {
                        case lt.Emulated: {
                            let o = this.rendererByCompId.get(r.id);
                            return o || (o = new hM(this.eventManager, this.sharedStylesHost, r, this.appId), this.rendererByCompId.set(r.id, o)), o.applyToHost(n), o
                        }
                        case 1:
                        case lt.ShadowDom:
                            return new gM(this.eventManager, this.sharedStylesHost, n, r);
                        default:
                            if (!this.rendererByCompId.has(r.id)) {
                                const o = Ii(r.id, r.styles, []);
                                this.sharedStylesHost.addStyles(o), this.rendererByCompId.set(r.id, this.defaultRenderer)
                            }
                            return this.defaultRenderer
                    }
                }

                begin() {
                }

                end() {
                }
            }

            return e.\u0275fac = function (n) {
                return new (n || e)(U(bi), U(Qr), U($r))
            }, e.\u0275prov = K({token: e, factory: e.\u0275fac}), e
        })();

        class zu {
            constructor(t) {
                this.eventManager = t, this.data = Object.create(null), this.destroyNode = null
            }

            destroy() {
            }

            createElement(t, n) {
                return n ? document.createElementNS($u[n] || n, t) : document.createElement(t)
            }

            createComment(t) {
                return document.createComment(t)
            }

            createText(t) {
                return document.createTextNode(t)
            }

            appendChild(t, n) {
                (Yg(t) ? t.content : t).appendChild(n)
            }

            insertBefore(t, n, r) {
                t && (Yg(t) ? t.content : t).insertBefore(n, r)
            }

            removeChild(t, n) {
                t && t.removeChild(n)
            }

            selectRootElement(t, n) {
                let r = "string" == typeof t ? document.querySelector(t) : t;
                if (!r) throw new Error(`The selector "${t}" did not match any elements`);
                return n || (r.textContent = ""), r
            }

            parentNode(t) {
                return t.parentNode
            }

            nextSibling(t) {
                return t.nextSibling
            }

            setAttribute(t, n, r, o) {
                if (o) {
                    n = o + ":" + n;
                    const i = $u[o];
                    i ? t.setAttributeNS(i, n, r) : t.setAttribute(n, r)
                } else t.setAttribute(n, r)
            }

            removeAttribute(t, n, r) {
                if (r) {
                    const o = $u[r];
                    o ? t.removeAttributeNS(o, n) : t.removeAttribute(`${r}:${n}`)
                } else t.removeAttribute(n)
            }

            addClass(t, n) {
                t.classList.add(n)
            }

            removeClass(t, n) {
                t.classList.remove(n)
            }

            setStyle(t, n, r, o) {
                o & (Ne.DashCase | Ne.Important) ? t.style.setProperty(n, r, o & Ne.Important ? "important" : "") : t.style[n] = r
            }

            removeStyle(t, n, r) {
                r & Ne.DashCase ? t.style.removeProperty(n) : t.style[n] = ""
            }

            setProperty(t, n, r) {
                t[n] = r
            }

            setValue(t, n) {
                t.nodeValue = n
            }

            listen(t, n, r) {
                return "string" == typeof t ? this.eventManager.addGlobalEventListener(t, n, Qg(r)) : this.eventManager.addEventListener(t, n, Qg(r))
            }
        }

        function Yg(e) {
            return "TEMPLATE" === e.tagName && void 0 !== e.content
        }

        class hM extends zu {
            constructor(t, n, r, o) {
                super(t), this.component = r;
                const i = Ii(o + "-" + r.id, r.styles, []);
                n.addStyles(i), this.contentAttr = function dM(e) {
                    return "_ngcontent-%COMP%".replace(Uu, e)
                }(o + "-" + r.id), this.hostAttr = function fM(e) {
                    return "_nghost-%COMP%".replace(Uu, e)
                }(o + "-" + r.id)
            }

            applyToHost(t) {
                super.setAttribute(t, this.hostAttr, "")
            }

            createElement(t, n) {
                const r = super.createElement(t, n);
                return super.setAttribute(r, this.contentAttr, ""), r
            }
        }

        class gM extends zu {
            constructor(t, n, r, o) {
                super(t), this.sharedStylesHost = n, this.hostEl = r, this.shadowRoot = r.attachShadow({mode: "open"}), this.sharedStylesHost.addHost(this.shadowRoot);
                const i = Ii(o.id, o.styles, []);
                for (let s = 0; s < i.length; s++) {
                    const a = document.createElement("style");
                    a.textContent = i[s], this.shadowRoot.appendChild(a)
                }
            }

            nodeOrShadowRoot(t) {
                return t === this.hostEl ? this.shadowRoot : t
            }

            destroy() {
                this.sharedStylesHost.removeHost(this.shadowRoot)
            }

            appendChild(t, n) {
                return super.appendChild(this.nodeOrShadowRoot(t), n)
            }

            insertBefore(t, n, r) {
                return super.insertBefore(this.nodeOrShadowRoot(t), n, r)
            }

            removeChild(t, n) {
                return super.removeChild(this.nodeOrShadowRoot(t), n)
            }

            parentNode(t) {
                return this.nodeOrShadowRoot(super.parentNode(this.nodeOrShadowRoot(t)))
            }
        }

        let mM = (() => {
            class e extends Ug {
                constructor(n) {
                    super(n)
                }

                supports(n) {
                    return !0
                }

                addEventListener(n, r, o) {
                    return n.addEventListener(r, o, !1), () => this.removeEventListener(n, r, o)
                }

                removeEventListener(n, r, o) {
                    return n.removeEventListener(r, o)
                }
            }

            return e.\u0275fac = function (n) {
                return new (n || e)(U(Nt))
            }, e.\u0275prov = K({token: e, factory: e.\u0275fac}), e
        })();
        const Kg = ["alt", "control", "meta", "shift"], DM = {
            "\b": "Backspace",
            "\t": "Tab",
            "\x7f": "Delete",
            "\x1b": "Escape",
            Del: "Delete",
            Esc: "Escape",
            Left: "ArrowLeft",
            Right: "ArrowRight",
            Up: "ArrowUp",
            Down: "ArrowDown",
            Menu: "ContextMenu",
            Scroll: "ScrollLock",
            Win: "OS"
        }, Jg = {
            A: "1",
            B: "2",
            C: "3",
            D: "4",
            E: "5",
            F: "6",
            G: "7",
            H: "8",
            I: "9",
            J: "*",
            K: "+",
            M: "-",
            N: ".",
            O: "/",
            "`": "0",
            "\x90": "NumLock"
        }, vM = {alt: e => e.altKey, control: e => e.ctrlKey, meta: e => e.metaKey, shift: e => e.shiftKey};
        let _M = (() => {
            class e extends Ug {
                constructor(n) {
                    super(n)
                }

                supports(n) {
                    return null != e.parseEventName(n)
                }

                addEventListener(n, r, o) {
                    const i = e.parseEventName(r), s = e.eventCallback(i.fullKey, o, this.manager.getZone());
                    return this.manager.getZone().runOutsideAngular(() => Gr().onAndCancel(n, i.domEventName, s))
                }

                static parseEventName(n) {
                    const r = n.toLowerCase().split("."), o = r.shift();
                    if (0 === r.length || "keydown" !== o && "keyup" !== o) return null;
                    const i = e._normalizeKey(r.pop());
                    let s = "";
                    if (Kg.forEach(u => {
                        const l = r.indexOf(u);
                        l > -1 && (r.splice(l, 1), s += u + ".")
                    }), s += i, 0 != r.length || 0 === i.length) return null;
                    const a = {};
                    return a.domEventName = o, a.fullKey = s, a
                }

                static getEventFullKey(n) {
                    let r = "", o = function wM(e) {
                        let t = e.key;
                        if (null == t) {
                            if (t = e.keyIdentifier, null == t) return "Unidentified";
                            t.startsWith("U+") && (t = String.fromCharCode(parseInt(t.substring(2), 16)), 3 === e.location && Jg.hasOwnProperty(t) && (t = Jg[t]))
                        }
                        return DM[t] || t
                    }(n);
                    return o = o.toLowerCase(), " " === o ? o = "space" : "." === o && (o = "dot"), Kg.forEach(i => {
                        i != o && (0, vM[i])(n) && (r += i + ".")
                    }), r += o, r
                }

                static eventCallback(n, r, o) {
                    return i => {
                        e.getEventFullKey(i) === n && o.runGuarded(() => r(i))
                    }
                }

                static _normalizeKey(n) {
                    return "esc" === n ? "escape" : n
                }
            }

            return e.\u0275fac = function (n) {
                return new (n || e)(U(Nt))
            }, e.\u0275prov = K({token: e, factory: e.\u0275fac}), e
        })();
        const IM = sg(xb, "browser", [{provide: Jh, useValue: "browser"}, {
                provide: Kh, useValue: function CM() {
                    Hu.makeCurrent()
                }, multi: !0
            }, {
                provide: Nt, useFactory: function bM() {
                    return function TD(e) {
                        Es = e
                    }(document), document
                }, deps: []
            }]), em = new V(""), tm = [{
                provide: ai, useClass: class aM {
                    addToWindow(t) {
                        z.getAngularTestability = (r, o = !0) => {
                            const i = t.findTestabilityInTree(r, o);
                            if (null == i) throw new Error("Could not find testability for element.");
                            return i
                        }, z.getAllAngularTestabilities = () => t.getAllTestabilities(), z.getAllAngularRootElements = () => t.getAllRootElements(), z.frameworkStabilizers || (z.frameworkStabilizers = []), z.frameworkStabilizers.push(r => {
                            const o = z.getAllAngularTestabilities();
                            let i = o.length, s = !1;
                            const a = function (u) {
                                s = s || u, i--, 0 == i && r(s)
                            };
                            o.forEach(function (u) {
                                u.whenStable(a)
                            })
                        })
                    }

                    findTestabilityInTree(t, n, r) {
                        return null == n ? null : t.getTestability(n) ?? (r ? Gr().isShadowRoot(n) ? this.findTestabilityInTree(t, n.host, !0) : this.findTestabilityInTree(t, n.parentElement, !0) : null)
                    }
                }, deps: []
            }, {provide: rg, useClass: mu, deps: [me, yu, ai]}, {provide: mu, useClass: mu, deps: [me, yu, ai]}],
            nm = [{provide: Fs, useValue: "root"}, {
                provide: Nn, useFactory: function EM() {
                    return new Nn
                }, deps: []
            }, {provide: Ei, useClass: mM, multi: !0, deps: [Nt, me, Jh]}, {
                provide: Ei,
                useClass: _M,
                multi: !0,
                deps: [Nt]
            }, {provide: Gu, useClass: Gu, deps: [bi, Qr, $r]}, {provide: nd, useExisting: Gu}, {
                provide: Gg,
                useExisting: Qr
            }, {provide: Qr, useClass: Qr, deps: [Nt]}, {
                provide: bi,
                useClass: bi,
                deps: [Ei, me]
            }, {
                provide: class tM {
                }, useClass: uM, deps: []
            }, []];
        let MM = (() => {
            class e {
                constructor(n) {
                }

                static withServerTransition(n) {
                    return {
                        ngModule: e,
                        providers: [{provide: $r, useValue: n.appId}, {provide: $g, useExisting: $r}, sM]
                    }
                }
            }

            return e.\u0275fac = function (n) {
                return new (n || e)(U(em, 12))
            }, e.\u0275mod = ir({type: e}), e.\u0275inj = un({providers: [...nm, ...tm], imports: [YI, Nb]}), e
        })();

        function LM(e, t) {
            if (1 & e && (ie(0, "li"), Fe(1), Ja(2, "titlecase"), X()), 2 & e) {
                const n = t.$implicit;
                He(1), rn(" ", Xa(2, 1, n), " ")
            }
        }

        typeof window < "u" && window;
        let kM = (() => {
            class e {
                constructor() {
                    this.team = [], this.index = 0
                }

                ngOnInit() {
                }
            }

            return e.\u0275fac = function (n) {
                return new (n || e)
            }, e.\u0275cmp = io({
                type: e,
                selectors: [["app-team"]],
                inputs: {team: "team", index: "index"},
                decls: 5,
                vars: 2,
                consts: [[1, "team-container"], [4, "ngFor", "ngForOf"]],
                template: function (n, r) {
                    1 & n && (ie(0, "div", 0)(1, "h3"), Fe(2), X(), ie(3, "ul"), qn(4, LM, 3, 3, "li", 1), X()()), 2 & n && (He(2), rn("Team ", r.index + 1, ""), He(2), gt("ngForOf", r.team))
                },
                dependencies: [Ru, Vu],
                styles: [".team-container[_ngcontent-%COMP%]{margin-right:10px}.team-container[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%]{border-radius:24px;background:radial-gradient(700% 250% at 0% -14%,rgb(21 12 98) 15%,rgb(17 166 182) 100%);-webkit-backdrop-filter:blur(42px);backdrop-filter:blur(42px);padding-top:1rem;padding-bottom:1rem;padding-right:2rem;height:-moz-fit-content;height:fit-content;min-width:6rem;width:max-content}"]
            }), e
        })();

        function VM(e, t) {
            if (1 & e && (ie(0, "li"), Fe(1), Ja(2, "titlecase"), X()), 2 & e) {
                const n = t.$implicit;
                He(1), rn(" ", Xa(2, 1, n), " ")
            }
        }

        function jM(e, t) {
            if (1 & e && (ie(0, "p", 16), Fe(1), X()), 2 & e) {
                const n = Ba();
                He(1), Ua(n.errorMessage)
            }
        }

        function BM(e, t) {
            if (1 & e && La(0, "app-team", 19), 2 & e) {
                const r = t.index;
                gt("team", t.$implicit)("index", r)
            }
        }

        function HM(e, t) {
            if (1 & e && (ie(0, "div", 17), qn(1, BM, 1, 2, "app-team", 18), X()), 2 & e) {
                const n = Ba();
                He(1), gt("ngForOf", n.teams)
            }
        }

        let $M = (() => {
            class e {
                constructor() {
                    this.newMemberName = "", this.members = [], this.numberOfTeams = "", this.errorMessage = "", this.teams = []
                }

                onNameInput(n) {
                    this.newMemberName = n
                }

                onNumberOfTeamsInput(n) {
                    this.numberOfTeams = Number(n)
                }

                addMember() {
                    this.teams = [], this.newMemberName ? (this.errorMessage = "", this.members.push(this.newMemberName), this.newMemberName = "") : this.errorMessage = "Name can't be empty!"
                }

                generateTeams() {
                    if (!this.numberOfTeams || this.numberOfTeams <= 0) return void (this.errorMessage = "Invalid number of teams!");
                    if (this.members.length < this.numberOfTeams) return void (this.errorMessage = "Not enough members!");
                    this.errorMessage = "";
                    const n = [...this.members];
                    for (; n.length;) for (let r = 0; r < this.numberOfTeams; r++) {
                        const o = Math.floor(Math.random() * n.length), i = n.splice(o, 1)[0];
                        if (!i) break;
                        this.teams[r] ? this.teams[r].push(i) : this.teams[r] = [i]
                    }
                    this.members = [], this.numberOfTeams = ""
                }
            }

            return e.\u0275fac = function (n) {
                return new (n || e)
            }, e.\u0275cmp = io({
                type: e,
                selectors: [["app-root"]],
                decls: 38,
                vars: 6,
                consts: [[1, "container"], [1, "card"], [1, "dataset-picker"], [1, "list-members"], [1, "list-and-counter"], [4, "ngFor", "ngForOf"], [1, "counter-member"], [1, "add-member-container"], ["type", "text", "placeholder", "Name", 3, "value", "input"], ["addMemberInput", ""], [3, "click"], [1, "generate-teams-container"], ["type", "number", "placeholder", "# of teams", 3, "value", "input"], ["numberOfTeamsInput", ""], ["class", "error-msg", 4, "ngIf"], ["class", "teams-container", 4, "ngIf"], [1, "error-msg"], [1, "teams-container"], [3, "team", "index", 4, "ngFor", "ngForOf"], [3, "team", "index"]],
                template: function (n, r) {
                    if (1 & n) {
                        const o = function Hf() {
                            return y()
                        }();
                        ie(0, "body")(1, "div", 0)(2, "div", 1)(3, "h1"), Fe(4, "Randomizer"), X(), ie(5, "aside", 2)(6, "form")(7, "p")(8, "label"), Fe(9, "Choose which randomizer dataset"), X(), ie(10, "select")(11, "option"), Fe(12, "Team generator"), X(), ie(13, "option"), Fe(14, "Decision maker"), X(), ie(15, "option"), Fe(16, "Name picker"), X(), ie(17, "option"), Fe(18, "Custom list randomizer"), X()()()()(), ie(19, "div", 3)(20, "div", 4)(21, "ul"), qn(22, VM, 3, 3, "li", 5), X(), ie(23, "div", 6)(24, "p"), Fe(25), X()()(), ie(26, "div", 7)(27, "input", 8, 9), Wn("input", function () {
                            es(o);
                            const s = Oa(28);
                            return ts(r.onNameInput(s.value))
                        }), X(), ie(29, "button", 10), Wn("click", function () {
                            return r.addMember()
                        }), Fe(30, "Add"), X()(), ie(31, "div", 11)(32, "input", 12, 13), Wn("input", function () {
                            es(o);
                            const s = Oa(33);
                            return ts(r.onNumberOfTeamsInput(s.value))
                        }), X(), ie(34, "button", 10), Wn("click", function () {
                            return r.generateTeams()
                        }), Fe(35, "Generate"), X()(), qn(36, jM, 2, 1, "p", 14), X()(), qn(37, HM, 2, 1, "div", 15), X()()
                    }
                    2 & n && (He(22), gt("ngForOf", r.members), He(3), rn(" ", r.members.length, " Members "), He(2), gt("value", r.newMemberName), He(5), gt("value", r.numberOfTeams), He(4), gt("ngIf", r.errorMessage), He(1), gt("ngIf", r.teams.length))
                },
                dependencies: [Ru, Lg, kM, Vu],
                styles: [".container[_ngcontent-%COMP%]{background:radial-gradient(100% 100% at 50% 50%,rgba(50,25,250,.4) 10%,rgba(255,255,255,0) 50%);-webkit-backdrop-filter:blur(42px);backdrop-filter:blur(42px);padding:10rem;margin:0 auto}.card[_ngcontent-%COMP%]{padding:2rem}.dataset-picker[_ngcontent-%COMP%]   select[_ngcontent-%COMP%]{background-color:#3828a7;margin-left:3%;color:#fff;border-radius:5px;padding:2px;min-width:11rem}.list-and-counter[_ngcontent-%COMP%]{display:flex}.list-members[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%]{background:radial-gradient(100% 100% at 0% 0%,rgba(255,255,255,.4) 0%,rgba(255,255,255,0) 100%);-webkit-backdrop-filter:blur(42px);backdrop-filter:blur(42px);display:flex;flex-wrap:wrap;height:auto;min-height:auto;border-radius:24px;overflow:auto;min-width:11em;width:50%;margin:0;padding:1rem 0}.counter-member[_ngcontent-%COMP%]{display:flex;flex-wrap:nowrap;justify-content:center;align-items:center;width:50%}.list-members[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]{width:-moz-fit-content;width:fit-content;margin-left:1rem;margin-right:1rem}.counter-member[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{display:flex;text-align:center;align-items:center;justify-content:center;color:#fff;text-shadow:#FF2D95 0px 0px 20px,#FF2D95 0px 0px 30px,#FF2D95 0px 0px 40px,#FF2D95 0px 0px 50px,#FF2D95 0px 0px 75px}.add-member-container[_ngcontent-%COMP%]{margin:3rem 0 0;height:2rem;display:flex;min-width:11em}.add-member-container[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]{border:none;width:100%}.add-member-container[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]{background-color:#00358b;width:100%}.generate-teams-container[_ngcontent-%COMP%]{margin:3rem 0 0;display:flex;height:2rem;min-width:11em}.generate-teams-container[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]{background-color:#008b8b;width:50%}.generate-teams-container[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]{border:none;width:50%}.teams-container[_ngcontent-%COMP%]{padding-left:2rem;padding-right:2rem;display:flex;flex-wrap:wrap;width:100%;margin-top:1rem}"]
            }), e
        })(), UM = (() => {
            class e {
            }

            return e.\u0275fac = function (n) {
                return new (n || e)
            }, e.\u0275mod = ir({type: e, bootstrap: [$M]}), e.\u0275inj = un({imports: [MM]}), e
        })();
        (function hb() {
            pg = !1
        })(), IM().bootstrapModule(UM).catch(e => console.error(e))
    }
}, te => {
    te(te.s = 931)
}]);