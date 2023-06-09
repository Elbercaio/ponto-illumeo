/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
'use strict';

module.exports = {
  up: (queryInterface, _Sequelize) =>
    queryInterface.bulkInsert('user_records', [
      {
        user_code: '4SXXFMf',
        record_type: 'start',
        timestamp: '2023-04-14 08:01:14',
      },
      {
        user_code: '4SXXFMf',
        record_type: 'end',
        timestamp: '2023-04-14 12:00:32',
      },
      {
        user_code: '4SXXFMf',
        record_type: 'start',
        timestamp: '2023-04-14 13:30:09',
      },
      {
        user_code: '4SXXFMf',
        record_type: 'end',
        timestamp: '2023-04-14 17:30:54',
      },
      {
        user_code: '4SXXFMf',
        record_type: 'start',
        timestamp: '2023-04-15 07:59:56',
      },
      {
        user_code: '4SXXFMf',
        record_type: 'end',
        timestamp: '2023-04-15 12:02:43',
      },
      {
        user_code: '4SXXFMf',
        record_type: 'start',
        timestamp: '2023-04-15 13:30:25',
      },
      {
        user_code: '4SXXFMf',
        record_type: 'end',
        timestamp: '2023-04-15 17:30:32',
      },
    ]),

  down: (queryInterface, _Sequelize) => queryInterface.bulkDelete('user_records', null, {}),
};
