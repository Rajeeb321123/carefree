export default{
    name:'comment',
    title:'Comment',
    type:'document',
    // field is most imp and sanity add new object for each field
    fields:[
        {
            name:'postedBy',
            title:'PostedBy',
            type:'postedBy'
        },
        {
            name:'comment',
            title:'Comment',
            type:'string',
        }
    ]
}