Timestamp Microservice
======================

This is a **microservice** that will show on the page a  
**timestamp** that is extracted from the url query string.

The timestamp will accept the query string in either  
**unixtime** or **natural language date**  
_e.g. January 1, 2016_

Natural language dates will have spaces parsed from 
´%20´

If no valid timestamp is given, it will return null

This is a pure node server