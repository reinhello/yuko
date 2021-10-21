"use strict";

const Base = require("./Base");

/**
 * Represents a role
 * @extends {Base}
 * @property {Number} color The color of the role in hexdecimal color code
 * @property {Guild} guild The guild of where the role was found
 * @property {Boolean} hoist Whether the role is hoisted or not
 * @property {String} id The ID of the role
 * @property {Boolean} managed Whether the role is managed by an integration or not
 * @property {Boolean} mentionable Whether the role is mentionable or not
 * @property {String} name The name of the role
 * @property {Number} position The position of the role 
 */
class Role extends Base {
    constructor(client, guild, data) {
        super(data.id);

        this.client = client;
        this.guild = guild;

        if (data) this._load(data);
    }

    _load(data) {
        this.color = data.color;
        this.hoist = data.hoist;
        this.managed = data.managed;
        this.mentionable = data.mentionable;
        this.name = data.name;
        this.position = data.position;
    }
}

module.exports = Role;