www.motorcycle-use.com

http://www.motorcycle-usa.com/11/motorcycles/buyers-guide.aspx

All brand pages
- $(".bikeguidebikeyearinnercontainer a")
 - .text = brand name
 - href = link

Visit brand page:
- Find link for the 2015 models: $(".bikeguidebikeyearinnercontainer a:contains('2015')")

Goto 2015 models page for brand:
- On the list of bikes get all entries: $(".buyersguidelistviewimgtemplate, .buyersguidelistviewalttemplate")
- Entry of all pictures and links to models: $(".buyersguidelistviewcolumn1 a")

First <a href> contains url for bike specific page

On bike specific page:
- Get image url: $(".buyersguideimgandcomentcontlftimg img")
- Get specs: $(".buyersguideleftdatacnt, .buyersguiderightdatacnt")
 - array[0] = spec-name
 - array[1] = spec-value

