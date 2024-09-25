/**
 * @schema AdminStore
 * type: object
 * description: The store's details.
 * x-schemaName: AdminStore
 * required:
 *   - id
 *   - name
 *   - supported_currencies
 *   - default_sales_channel_id
 *   - default_region_id
 *   - default_location_id
 *   - metadata
 *   - created_at
 *   - updated_at
 * properties:
 *   id:
 *     type: string
 *     title: id
 *     description: The store's ID.
 *   name:
 *     type: string
 *     title: name
 *     description: The store's name.
 *   supported_currencies:
 *     type: array
 *     description: The store's supported currencies.
 *     items:
 *       $ref: "#/components/schemas/AdminStoreCurrency"
 *   default_sales_channel_id:
 *     type: string
 *     title: default_sales_channel_id
 *     description: The ID of the sales channel used by default in the store.
 *   default_region_id:
 *     type: string
 *     title: default_region_id
 *     description: The ID of the region used by default in the store.
 *   default_location_id:
 *     type: string
 *     title: default_location_id
 *     description: The ID of the stock location used by default in the store.
 *   metadata:
 *     type: object
 *     description: The store's metadata, can hold custom key-value pairs.
 *   created_at:
 *     type: string
 *     format: date-time
 *     title: created_at
 *     description: The date the store was created.
 *   updated_at:
 *     type: string
 *     format: date-time
 *     title: updated_at
 *     description: The date the store was updated.
 * 
*/

