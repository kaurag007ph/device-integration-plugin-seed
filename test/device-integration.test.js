/*
 * Just a sample code to test the device integration plugin.
 * Kindly write your own unit tests for your own plugin.
 */
'use strict';

var cp     = require('child_process'),
    assert = require('assert'),
    deviceIntegration;

describe('Device-integration', function () {
    this.slow(5000);

    after('terminate child process', function () {
        deviceIntegration.kill('SIGKILL');
    });

    describe('#spawn', function () {
        it('should spawn a child process', function () {
            assert.ok(deviceIntegration = cp.fork(process.cwd()), 'Child process not spawned.');
        });
    });

    describe('#handShake', function () {
        it('should notify the parent process when ready within 5 seconds', function (done) {
            this.timeout(5000);

            deviceIntegration.on('message', function (message) {
                if (message.type === 'ready')
                    done();
            });

            deviceIntegration.send({
                type: 'ready',
                data: {
                    options: {
                        config_field1: 'configfieldvalue',
                        config_field2: 25
                    }
                }
            }, function (error) {
                assert.ifError(error);
            });
        });
    });

    describe('#adddevice', function () {
        it('should add the device', function (done) {
            deviceIntegration.send({
                type: 'adddevice',
                data: {
                    _id: `${Date.now() + 1}`,
                    name: 'Heart Rate Monitor 3'
                }
            }, done);
        });
    });

    describe('#updatedevice', function () {
        it('should update the device', function (done) {
            deviceIntegration.send({
                type: 'updatedevice',
                data: {
                    _id: `${Date.now() + 1}`,
                    name: 'Heart Rate Monitor 3',
                    metadata: {
                        username: 'heart3',
                        password: 'heart3-pass',
                        otheruserdefinedproperty: 'Other User Defined Property 3'
                    }
                }
            }, done);
        });
    });

    describe('#removedevice', function () {
        it('should remove the device', function (done) {
            deviceIntegration.send({
                type: 'removedevice',
                data: {
                    _id: `${Date.now() + 1}`
                }
            }, done);
        });
    });
});