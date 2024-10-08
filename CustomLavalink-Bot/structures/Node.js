"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Node = void 0;
const tslib_1 = require("tslib");
/* eslint-disable no-case-declarations */
const ws_1 = tslib_1.__importDefault(require("ws"));
const undici_1 = require("undici");
const Utils_1 = require("./Utils");
function check(options) {
    if (!options)
        throw new TypeError("NodeOptions must not be empty.");
    if (typeof options.host !== "string" ||
        !/.+/.test(options.host))
        throw new TypeError('Node option "host" must be present and be a non-empty string.');
    if (typeof options.port !== "undefined" &&
        typeof options.port !== "number")
        throw new TypeError('Node option "port" must be a number.');
    if (typeof options.password !== "undefined" &&
        (typeof options.password !== "string" ||
            !/.+/.test(options.password)))
        throw new TypeError('Node option "password" must be a non-empty string.');
    if (typeof options.secure !== "undefined" &&
        typeof options.secure !== "boolean")
        throw new TypeError('Node option "secure" must be a boolean.');
    if (typeof options.identifier !== "undefined" &&
        typeof options.identifier !== "string")
        throw new TypeError('Node option "identifier" must be a non-empty string.');
    if (typeof options.retryAmount !== "undefined" &&
        typeof options.retryAmount !== "number")
        throw new TypeError('Node option "retryAmount" must be a number.');
    if (typeof options.retryDelay !== "undefined" &&
        typeof options.retryDelay !== "number")
        throw new TypeError('Node option "retryDelay" must be a number.');
    if (typeof options.requestTimeout !== "undefined" &&
        typeof options.requestTimeout !== "number")
        throw new TypeError('Node option "requestTimeout" must be a number.');
}
class Node {
    options;
    /** The socket for the node. */
    socket = null;
    /** The HTTP pool used for rest calls. */
    http;
    /** The amount of rest calls the node has made. */
    calls = 0;
    /** The stats for the node. */
    stats;
    manager;
    static _manager;
    reconnectTimeout;
    reconnectAttempts = 1;
    /** Returns if connected to the Node. */
    get connected() {
        if (!this.socket)
            return false;
        return this.socket.readyState === ws_1.default.OPEN;
    }
    /** Returns the address for this node. */
    get address() {
        return `${this.options.host}:${this.options.port}`;
    }
    /** @hidden */
    static init(manager) {
        this._manager = manager;
    }
    /**
     * Creates an instance of Node.
     * @param options
     */
    constructor(options) {
        this.options = options;
        if (!this.manager)
            this.manager = Utils_1.Structure.get("Node")._manager;
        if (!this.manager)
            throw new RangeError("Manager has not been initiated.");
        if (this.manager.nodes.has(options.identifier || options.host)) {
            return this.manager.nodes.get(options.identifier || options.host);
        }
        check(options);
        this.options = {
            port: 2334,
            password: "youshallnotpass",
            secure: false,
            retryAmount: 5,
            retryDelay: 30e3,
            ...options,
        };
        if (this.options.secure) {
            this.options.port = 443;
        }
        this.http = new undici_1.Pool(`http${this.options.secure ? "s" : ""}://${this.address}`, this.options.poolOptions);
        this.options.identifier = options.identifier || options.host;
        this.stats = {
            players: 0,
            playingPlayers: 0,
            uptime: 0,
            memory: {
                free: 0,
                used: 0,
                allocated: 0,
                reservable: 0,
            },
            cpu: {
                cores: 0,
                systemLoad: 0,
                lavalinkLoad: 0,
            },
            frameStats: {
                sent: 0,
                nulled: 0,
                deficit: 0,
            },
        };
        this.manager.nodes.set(this.options.identifier, this);
        this.manager.emit("nodeCreate", this);
    }
    /** Connects to the Node. */
    connect() {
        if (this.connected)
            return;
        const headers = {
            Authorization: this.options.password,
            "Num-Shards": String(this.manager.options.shards),
            "User-Id": this.manager.options.clientId,
            "Client-Name": this.manager.options.clientName,
        };
        this.socket = new ws_1.default(`ws${this.options.secure ? "s" : ""}://${this.address}/v4/websocket`, { headers });
        this.socket.on("open", this.open.bind(this));
        this.socket.on("close", this.close.bind(this));
        this.socket.on("message", this.message.bind(this));
        this.socket.on("error", this.error.bind(this));
    }
    /** Destroys the Node and all players connected with it. */
    destroy() {
        if (!this.connected)
            return;
        const players = this.manager.players.filter(p => p.node == this);
        if (players.size)
            players.forEach(p => p.destroy());
        this.socket.close(1000, "destroy");
        this.socket.removeAllListeners();
        this.socket = null;
        this.reconnectAttempts = 1;
        clearTimeout(this.reconnectTimeout);
        this.manager.emit("nodeDestroy", this);
        this.manager.destroyNode(this.options.identifier);
    }
    /**
     * Makes an API call to the Node
     * @param endpoint The endpoint that we will make the call to
     * @param modify Used to modify the request before being sent
     * @returns The returned data
     */
    async makeRequest(endpoint, modify) {
        const options = {
            path: `/${endpoint.replace(/^\//gm, "")}`,
            method: "GET",
            headers: {
                Authorization: this.options.password
            },
            headersTimeout: this.options.requestTimeout,
        };
        modify?.(options);

        console.log(options)

        const request = await this.http.request(options);
        this.calls++;
        return await request.body.json();
    }
    /**
     * Sends data to the Node.
     * @param data
     */
    send(data) {
        return new Promise((resolve, reject) => {
            // if (!this.connected)
            //     return resolve(false);
            // if (!data || !JSON.stringify(data).startsWith("{")) {
            //     return reject(false);
            // }

            // console.log(JSON.stringify(data))

            // this.socket.send(JSON.stringify(data), (error) => {
            //     if (error)
            //         reject(error);
            //     else
            //         resolve(true);
            // });
        });
    }
    reconnect() {
        this.reconnectTimeout = setTimeout(() => {
            if (this.reconnectAttempts >= this.options.retryAmount) {
                const error = new Error(`Unable to connect after ${this.options.retryAmount} attempts.`);
                this.manager.emit("nodeError", this, error);
                return this.destroy();
            }
            this.socket.removeAllListeners();
            this.socket = null;
            this.manager.emit("nodeReconnect", this);
            this.connect();
            this.reconnectAttempts++;
        }, this.options.retryDelay);
    }
    open() {
        if (this.reconnectTimeout)
            clearTimeout(this.reconnectTimeout);
        this.manager.emit("nodeConnect", this);
    }
    close(code, reason) {
        this.manager.emit("nodeDisconnect", this, { code, reason });
        if (code !== 1000 || reason !== "destroy")
            this.reconnect();
    }
    error(error) {
        if (!error)
            return;
        this.manager.emit("nodeError", this, error);
    }
    message(d) {
        if (Array.isArray(d))
            d = Buffer.concat(d);
        else if (d instanceof ArrayBuffer)
            d = Buffer.from(d);
        const payload = JSON.parse(d.toString());
        if (!payload.op)
            return;
        this.manager.emit("nodeRaw", payload);
        switch (payload.op) {
            case "stats":
                delete payload.op;
                this.stats = { ...payload };
                break;
            case "playerUpdate":
                const player = this.manager.players.get(payload.guildId);
                if (player)
                    player.position = payload.state.position || 0;
                break;
            case "event":
                this.handleEvent(payload);
                break;
            case "ready": 
            this.sessionId = payload.sessionId 
            
            break;
            default:
                this.manager.emit("nodeError", this, new Error(`Unexpected op "${payload.op}" with data: ${payload}`));
                return;
        }
    }
    handleEvent(payload) {
        if (!payload.guildId)
            return;
        const player = this.manager.players.get(payload.guildId);
        if (!player)
            return;
        const track = player.queue.current;
        const type = payload.type;
        if (payload.type === "TrackStartEvent") {
            this.trackStart(player, track, payload);
        }
        else if (payload.type === "TrackEndEvent") {
            this.trackEnd(player, track, payload);
        }
        else if (payload.type === "TrackStuckEvent") {
            this.trackStuck(player, track, payload);
        }
        else if (payload.type === "TrackExceptionEvent") {
            this.trackError(player, track, payload);
        }
        else if (payload.type === "WebSocketClosedEvent") {
            this.socketClosed(player, payload);
        }
        else {
            const error = new Error(`Node#event unknown event '${type}'.`);
            this.manager.emit("nodeError", this, error);
        }
    }
    trackStart(player, track, payload) {
        player.playing = true;
        player.paused = false;
        this.manager.emit("trackStart", player, track, payload);
    }
    trackEnd(player, track, payload) {
        // If a track had an error while starting
        if (["LOAD_FAILED", "CLEAN_UP"].includes(payload.reason)) {
            player.queue.previous = player.queue.current;
            player.queue.current = player.queue.shift();
            if (!player.queue.current)
                return this.queueEnd(player, track, payload);
            this.manager.emit("trackEnd", player, track, payload);
            if (this.manager.options.autoPlay)
                player.play();
            return;
        }
        // If a track was forcibly played
        if (payload.reason === "REPLACED") {
            this.manager.emit("trackEnd", player, track, payload);
            return;
        }
        // If a track ended and is track repeating
        if (track && player.trackRepeat) {
            if (payload.reason === "STOPPED") {
                player.queue.previous = player.queue.current;
                player.queue.current = player.queue.shift();
            }
            if (!player.queue.current)
                return this.queueEnd(player, track, payload);
            this.manager.emit("trackEnd", player, track, payload);
            if (this.manager.options.autoPlay)
                player.play();
            return;
        }
        // If a track ended and is track repeating
        if (track && player.queueRepeat) {
            player.queue.previous = player.queue.current;
            if (payload.reason === "STOPPED") {
                player.queue.current = player.queue.shift();
                if (!player.queue.current)
                    return this.queueEnd(player, track, payload);
            }
            else {
                player.queue.add(player.queue.current);
                player.queue.current = player.queue.shift();
            }
            this.manager.emit("trackEnd", player, track, payload);
            if (this.manager.options.autoPlay)
                player.play();
            return;
        }
        // If there is another song in the queue
        if (player.queue.length) {
            player.queue.previous = player.queue.current;
            player.queue.current = player.queue.shift();
            this.manager.emit("trackEnd", player, track, payload);
            if (this.manager.options.autoPlay)
                player.play();
            return;
        }
        // If there are no songs in the queue
        if (!player.queue.length)
            return this.queueEnd(player, track, payload);
    }
    queueEnd(player, track, payload) {
        player.queue.current = null;
        player.playing = false;
        this.manager.emit("queueEnd", player, track, payload);
    }
    trackStuck(player, track, payload) {
        player.stop();
        this.manager.emit("trackStuck", player, track, payload);
    }
    trackError(player, track, payload) {
        player.stop();
        this.manager.emit("trackError", player, track, payload);
    }
    socketClosed(player, payload) {
        this.manager.emit("socketClosed", player, payload);
    }
}
exports.Node = Node;
