cube(`stations`, {
  sql_table: `public.stations`,
  
  data_source: `default`,
  
  joins: {
    
  },
  
  dimensions: {
    id: {
      sql: `id`,
      type: `number`,
      primary_key: true
    },
    
    name: {
      sql: `name`,
      type: `string`
    },

    capacity: {
      sql: `capacity`,
      type: `number`
    },
    
    lon: {
      sql: `lon`,
      type: `number`
    },

    lat: {
      sql: `lat`,
      type: `number`
    }, 
  },
  
  measures: {
    count: {
      type: `count`
    }
  },
  
  pre_aggregations: {
    // Pre-aggregation definitions go here.
    // Learn more in the documentation: https://cube.dev/docs/caching/pre-aggregations/getting-started
  }
});
