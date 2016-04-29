'use strict';

module.exports = [
    {
        table_name: 'ElasticSearch',
        fields: [
            {
                name: '编号',
                key: 'ref_id',
                type: '3',
                is_search_field: '1',
                is_unique_field: '1',
                is_index_field: '1',
                max_length: '100'
            }
        ]
    }
]