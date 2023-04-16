/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
'use strict';

module.exports = {
  up: (queryInterface, _Sequelize) =>
    queryInterface.bulkInsert('user_records', [
      {
        userId: 1,
        recordType: 'start',
        timestamp: '2023-04-14 08:01:14',
      },
      {
        userId: 1,
        recordType: 'end',
        timestamp: '2023-04-14 12:00:32',
      },
      {
        userId: 1,
        recordType: 'start',
        timestamp: '2023-04-14 13:30:09',
      },
      {
        userId: 1,
        recordType: 'end',
        timestamp: '2023-04-14 17:30:54',
      },
      {
        userId: 1,
        recordType: 'start',
        timestamp: '2023-04-14 07:59:56',
      },
      {
        userId: 1,
        recordType: 'end',
        timestamp: '2023-04-14 12:02:43',
      },
      {
        userId: 1,
        recordType: 'start',
        timestamp: '2023-04-14 13:30:25',
      },
    ]),

  down: (queryInterface, _Sequelize) => queryInterface.bulkDelete('user_records', null, {}),
};
