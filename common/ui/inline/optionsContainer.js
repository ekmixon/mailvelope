/**
 * Mailvelope - secure email with OpenPGP encryption for Webmail
 * Copyright (C) 2015 Mailvelope Authors
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License version 3
 * as published by the Free Software Foundation.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

'use strict';

var mvelo = mvelo || {};

mvelo.OptionsContainer = function(selector, keyringId, options) {
  this.selector = selector;
  this.keyringId = keyringId;

  this.email = '';
  if (options.email) {
    this.email = '&email=' + encodeURIComponent(options.email);
  }

  this.fullName = '';
  if (options.fullName) {
    this.fullName = '&fname=' + encodeURIComponent(options.fullName);
  }

  this.id = mvelo.util.getHash();
  this.parent = null;
  this.container = null;
  this.done = null;
};

mvelo.OptionsContainer.prototype.create = function(done) {
  this.done = done;
  this.parent = document.querySelector(this.selector);
  this.container = document.createElement('iframe');
  var url;
  var options = 'krid=' + encodeURIComponent(this.keyringId) + this.email + this.fullName;
  if (mvelo.crx) {
    url = mvelo.extension.getURL('common/ui/options.html?' + options);
  } else if (mvelo.ffa) {
    url = 'about:blank?mvelo=options&' + options;
  }
  this.container.setAttribute('src', url);
  this.container.setAttribute('frameBorder', 0);
  this.container.setAttribute('style', 'width: 100%; height: 100%; overflow-x: none; overflow-y: auto');
  this.container.addEventListener('load', this.done.bind(this, null, this.id));
  this.parent.appendChild(this.container);
};
