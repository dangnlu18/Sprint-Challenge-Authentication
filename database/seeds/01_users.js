
exports.seed = function(knex) {
    // Deletes ALL existing entries
    return knex('users').del()
      .then(function () {
        // Inserts seed entries
        return knex('users').insert([
          {id: 1, username:'dang', password:'$2a$14$accVLKnwabqpKesp4Jhm2.kVgT27TjW/KtvlJIzejN4lAFAA0RnVa'},
        ]);
      });
  };
  