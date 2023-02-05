export default{
    name:'postedBy',
    title:'Posted By',
    // type reference means it can connect to different document
    type:'reference',
    // reference to: and one user can post multiple comments and keep track of it
    to:[{type:'user'}]
}