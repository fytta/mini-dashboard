const {GraphQLObjectType, GraphQLInt} = require('graphql');

const FilmYearType = new GraphQLObjectType({
    name: "FilmYear",
    fields: {
        year:   {type: GraphQLInt},
        number: {type: GraphQLInt},
    }
});

module.exports = FilmYearType;