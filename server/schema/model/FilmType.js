const {GraphQLObjectType, GraphQLString, GraphQLInt} = require('graphql');

const FilmType = new GraphQLObjectType({
    name: "Film",
    fields: {
        id:           {type: GraphQLInt},
        title:        {type: GraphQLString},
        description:  {type: GraphQLString},
        release_year: {type: GraphQLInt},
        stock:        {type: GraphQLInt},
    }
});

module.exports = FilmType;