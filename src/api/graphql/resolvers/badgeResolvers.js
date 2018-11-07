// class Badge {
//   constructor({
//     name,
//   }) {
//     this.name = name;
//   }
// }
//
// const badgeResolvers = {
//   Query: {
//     getBadges: (parent) => {
//       console.log('parent', parent);
//       return parent;
//     },
//   },
//   Mutation: {
//     addBadge: (parent, { input }) => {
//       const newBadge = new Badge(input);
//       return newBadge;
//     },
//   },
// };
//
// export default badgeResolvers;
