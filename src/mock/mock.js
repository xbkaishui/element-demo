/**
 * Created by xbkaishui on 17/2/16.
 */
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import {models, rules, varis} from './data';

export default {
    /**
     * mock bootstrap
     */
    bootstrap() {
        let mock = new MockAdapter(axios);

        // mock success request
        mock.onGet('/success').reply(200, {
            msg: 'success'
        }).onGet('/error').reply(500, {
            msg: 'failure'
        }).onGet('/api/models').reply(config => {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve([200, {
                        models
                    }]);
                }, 500);
            });
        }).onGet('/api/rules').reply(config => {
            return [ 200, {
                rules
            }]
        }).onGet('/api/varis').reply(config => {
            return [ 200, {
                varis
            }]
        })
        // .onAny().reply(config => {
        //   console.log(config.url);
        //    return [200, {}];
        // });
        mock.onAny().passThrough();

    }
};
