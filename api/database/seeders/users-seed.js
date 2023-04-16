/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
'use strict';

module.exports = {
  up: (queryInterface, _Sequelize) =>
    queryInterface.bulkInsert('users', [
      {
        code: '4SXXFMf',
      },
    ]),

  down: (queryInterface, _Sequelize) => queryInterface.bulkDelete('users', null, {}),
};
