const {GraphQLList, GraphQLInt, GraphQLObjectType, GraphQLSchema} = require('graphql');
const FILM_DATA = require('../FILM_DATA.json');
const FilmType = require('./model/FilmType');
const FilmYearType = require('./model/FilmYearType');

const RootQuery = new GraphQLObjectType({
     name: 'RootQueryType',
     fields: {
          getFilms: {
               type: new GraphQLList(FilmType),
               args: {id: {type: GraphQLInt}},
               resolve: (parent, args) => {
                    if (args.id) 
                         return [FILM_DATA[args.id-1]];   
                    else return FILM_DATA;
               }
          },
          getFilmsByStock: {
               type: new GraphQLList(FilmType),
               args: {min: {type: GraphQLInt},
                      max: {type: GraphQLInt}},
               resolve: (parent, args) => {
                    if (args.min != undefined && args.max != undefined) {
                         let films = [];
                         for (let i=0; i<FILM_DATA.length; i++) {   
                              if (args.min <= FILM_DATA[i].stock && FILM_DATA[i].stock <= args.max){
                                   films.push(FILM_DATA[i]);
                              }           
                         }
                         return films;
                     }
               }
          },
          getFilmsPerYear: {
               type: new GraphQLList(FilmYearType),
               resolve: (parent) => {
                    let films = {};
                    for (let i=0; i<FILM_DATA.length; i++) {
                         let year = FILM_DATA[i].release_year;
                         
                         if (films[year] != undefined){
                              films[year] = films[year]+1;
                         }
                         else {
                              films[year] = 1;
                         }                         
                    }
                    let result = [];
                    for (let key in films) {
                         result.push({year: key, number: films[key]});
                    }
                    return result;
               }
          }
     }
});

const schema = new GraphQLSchema({query: RootQuery});

module.exports = schema;