module.exports = {
    plugins : [
        require( 'autoprefixer' )(
            { /* ...options */ }
        ),
        require( 'cssnano' )(
            {
                mergeRules        : true,
                discardDuplicates : true,
                mergeLonghand     : true,
                zindex            : false
            }
        )
    ]
}
