import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({

    "screen-container": {
        direction:"rtl",
        flex: 1,
        alignItems: 'center'
    },

    "screen-content":
    {
        paddingTop:50,
        alignItems:"center",
        width:"100%",
        // gap: 20,
        flex: 1
    },

    "screen-content-scroll":
    {
        width: "100%",
        flexGrow: 1,
        padding: 20,
        paddingBottom:40,
        gap: 20,
        // alignItems:"center",
    },

    "navbar": {
        width:"100%",
        paddingVertical: 8,
        paddingHorizontal:25,
        justifyContent:"space-between",
        gap:25
    },

    "input": {
        backgroundColor:"white",
        paddingVertical:5,
        paddingHorizontal:10,

        borderColor:"#BFBFBF",
        borderWidth:2,
        borderRadius:5,

        flexGrow: 1
    },

    "toggle": {
      width:65,
      height:35,
      backgroundColor: "#7F7F7F",

      borderRadius:35,
      borderWidth:3,
      shadowColor:"black",
      elevation:10,

      justifyContent:"center",
      alignItems:"flex-end",
      overflow:"hidden"
    },

    "btn":
    {
        flexDirection:"row",
        alignItems:"center",
        justifyContent:"center",
        borderRadius:5,
        padding:5,
        gap:10,
        aspectRatio:1,
    },

    "btn-text":
    {
        fontSize:20,
        color:"white"
    },

    "hr":
    {
        width:"100%",
        borderColor:"black",
        borderWidth:StyleSheet.hairlineWidth,
    },

    "pos-rel": {position:"relative"},
    "pos-abs": {position:"absolute"},

    "w-100": {width:"100%"},
    "w-75": {width:"75%"},
    "w-50": {width:"50%"},
    "w-25": {width:"25%"},

    "h-100": {height:"100%"},
    "h-75": {height:"75%"},
    "h-50": {height:"50%"},
    "h-25": {height:"25%"},

    "lh-normal": {lineHeight:20},

    "text-center": {textAlign:"center"},
    "text-r": {textAlign:"right"},
    "text-l": {textAlign:"left"},

    "bg-white":
    {
        backgroundColor:"white"
    },
    "bg-black":
    {
        backgroundColor:"black"
    },
    "bg-primary":
    {
        backgroundColor:"#2620ede"
    },
    "bg-danger":
    {
        backgroundColor:"#c41d1d"
    },

    "bg-main":
    {
        backgroundColor: "#FEF7EA"
    },
    "bg-accent":
    {
        backgroundColor: "#C03E3E"
    },
   
    "col-black":
    {
        color:"black"
    },
    "col-white":
    {
        color:"white"
    },
    "col-primary":
    {
        color: "#0070C0"
    },
    "col-danger":
    {
        color: "#c41d1d"
    },

    "col-accent":
    {
      color: "#C03E3E"
    },
    "col-gray":
    {
        color: "#7F7F7F"
    },


    "w-100":
    {
        width: "100%"
    },

    "flex-row":
    {
        flexDirection:"row"
    },

    "al-items-c":
    {
        alignItems:"center"
    },

    "al-items-s":
    {
        alignItems:"flex-start"
    },

    "al-items-e":
    {
        alignItems:"flex-end"
    },

    "j-content-b":
    {
        justifyContent:"space-between"
    },

    "j-content-c":
    {
        justifyContent:"center"
    },

    "j-content-s":
    {
        justifyContent:"flex-start"
    },

    "j-content-e":
    {
        justifyContent:"flex-end"
    },

    "gap-1":
    {
        gap: 5
    },
    "gap-2":
    {
        gap: 10
    },
    "gap-3":
    {
        gap: 20
    },
    "gap-4":
    {
        gap: 30
    },


    "shadow":
    {
        shadowColor:"gray",
        elevation:5
    },

    "rounded":
    {
        borderRadius:5
    },

    "rounded-2":
    {
        borderRadius:10
    },

    "border-1":
    {
        borderWidth:1
    },

    "border-2":
    {
        borderWidth:2
    },

    "border-3":
    {
        borderWidth:3
    },

    "border-black":
    {
        borderColor:"black"
    },

    "border-danger":
    {
        borderColor:"#c41d1d"
    },

    "border-light":
    {
        borderColor:"lightgray"
    },
    "border-gray":
    {
       borderColor: "#7F7F7F" 
    },

    "fs-1":
    {
      fontSize: 30
    },
    "fs-2":
    {
      fontSize: 25
    },
    "fs-3":
    {
      fontSize: 20
    },
    "fs-4":
    {
      fontSize: 15
    },

    "p-1": { "padding": 10 },
    "p-2": { "padding": 20 },
    "p-3": { "padding": 30 },
    "p-4": { "padding": 50 },
    "pt-1": { "paddingTop": 10 },
    "pt-2": { "paddingTop": 20 },
    "pt-3": { "paddingTop": 30 },
    "pt-4": { "paddingTop": 50 },
    "pb-1": { "paddingBottom": 10 },
    "pb-2": { "paddingBottom": 20 },
    "pb-3": { "paddingBottom": 30 },
    "pb-4": { "paddingBottom": 50 },
    "pl-1": { "paddingLeft": 10 },
    "pl-2": { "paddingLeft": 20 },
    "pl-3": { "paddingLeft": 30 },
    "pl-4": { "paddingLeft": 50 },
    "pr-1": { "paddingRight": 10 },
    "pr-2": { "paddingRight": 20 },
    "pr-3": { "paddingRight": 30 },
    "pr-4": { "paddingRight": 50 },
    "px-1": { "paddingHorizontal": 10 },
    "px-2": { "paddingHorizontal": 20 },
    "px-3": { "paddingHorizontal": 30 },
    "px-4": { "paddingHorizontal": 50 },
    "py-1": { "paddingVertical": 10 },
    "py-2": { "paddingVertical": 20 },
    "py-3": { "paddingVertical": 30 },
    "py-4": { "paddingVertical": 50 },
    "m-1": { "margin": 10 },
    "m-2": { "margin": 20 },
    "m-3": { "margin": 30 },
    "m-4": { "margin": 50 },
    "mt-1": { "marginTop": 10 },
    "mt-2": { "marginTop": 20 },
    "mt-3": { "marginTop": 30 },
    "mt-4": { "marginTop": 50 },
    "mb-1": { "marginBottom": 10 },
    "mb-2": { "marginBottom": 20 },
    "mb-3": { "marginBottom": 30 },
    "mb-4": { "marginBottom": 50 },
    "ml-1": { "marginLeft": 10 },
    "ml-2": { "marginLeft": 20 },
    "ml-3": { "marginLeft": 30 },
    "ml-4": { "marginLeft": 50 },
    "mr-1": { "marginRight": 10 },
    "mr-2": { "marginRight": 20 },
    "mr-3": { "marginRight": 30 },
    "mr-4": { "marginRight": 50 },
    "mx-1": { "marginHorizontal": 10 },
    "mx-2": { "marginHorizontal": 20 },
    "mx-3": { "marginHorizontal": 30 },
    "mx-4": { "marginHorizontal": 50 },
    "my-1": { "marginVertical": 10 },
    "my-2": { "marginVertical": 20 },
    "my-3": { "marginVertical": 30 },
    "my-4": { "marginVertical": 50 },

    "overflow-hidden": {overflow:"hidden"},

    "row":
    {
        flexDirection:"row",
        flexWrap:"wrap"
    },


    

    "menu-item-col":
    {
        width:"50%",
    },

    "menu-item-container":
    {
        borderWidth: 3,
        borderColor:"#820000",
        borderRadius: 5,
        flex:1
    }
    
});


export function s(classes,extraStyles={})
{
    // return extraStyles;
    // const start = Date.now()
    const classList = classes.split(" ");
    let styleObject = {};
    classList.forEach((c)=>{
        styleObject = {...styleObject,...styles[c]};
    });
    // console.log(Date.now()-start)
    return {...styleObject,...extraStyles};
}


export default styles;