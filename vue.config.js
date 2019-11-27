module.exports = {
    devServer:{
       proxy:{
            "/user":{
                target:"http://106.13.31.92:8006",
                changeOrigin:true
            },
			// http://106.13.31.92:8006/user/Test/test/
       }
    },
}
