'use strict';

var platform = require('./platform'),
    client;

/**
 * Emitted when the platform issues a sync request. Means that the device integration should fetch updates from the
 * 3rd party service.
 */
platform.on('sync', function (lastSyncDate) {
    // TODO: Fetch updates from service

    /* Sample Code:
    *    client.fetchData({updated_since: lastSyncDate}, function (error, dataCollection) {
    *        dataCollection.forEach(function (data) {
    *            platform.syncDevice(data);
    *        });
    *    });
    */
});

platform.on('adddevice', function(device) {
    //TODO: Add device to 3rd party service

    /* Sample Code:
    *    client.addDevice(device, function() {
    *        console.log('New device added');
    *    });
    */

});

platform.on('updatedevice', function(device) {
    //TODO: Update device from 3rd party service

    /*  Sample Code:
    *   client.updateDevice(device, function() {
    *        console.log(`${device.name} has been updated`);
    *    });
    */
});

platform.on('removedevice', function(device) {
    //TODO: Remove device from 3rd party service

    /* Sample Code:
    *    client.removeDevice(device._id, function() {
    *    console.log(`${device.name} has been removed`);
    *    });
    */
});

/**
 * Emitted when the platform shuts down the plugin. The Device Integration should perform cleanup of the resources on this event.
 */
platform.once('close', function () {
    let d = require('domain').create();

    d.once('error', function (error) {
        console.error(error);
        platform.handleException(error);
        platform.notifyClose();
        d.exit();
    });

    d.run(function () {
        // TODO: Release all resources and close connections etc.
        platform.notifyClose(); // Notify the platform that resources have been released.
        d.exit();
    });
});

/**
 * Emitted when the platform bootstraps the plugin. The plugin should listen once and execute its init process.
 * Afterwards, platform.notifyReady() should be called to notify the platform that the init process is done.
 * @param {object} options The parameters or options. Specified through config.json.
 */
platform.once('ready', function (options) {
    /*
     * Initialize your device integration using the options. See config.json
     * You can customize config.json based on the needs of your plugin.
     * Reekoh will inject these configuration parameters as options here in the ready event.
     *
     * Note: Option Names are based on what you specify on the config.json.
     */

    // TODO: Initialize your client or subscribe to the 3rd party service here.

    /*
     * Sample Code
     *
     * var service = require('service');
     *
     * service.connect(options, function (error, serviceClient) {
     * 	client = serviceClient;
     * });
     */

    console.log(options);
    platform.notifyReady();
    platform.log('Device integration has been initialized.');
});