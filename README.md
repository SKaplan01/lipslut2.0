# Lipslut

Lipslut.com sells makeup to benefit progressive causes. The site is built with GatsbyJS, GraphQL, and AWS Lambda Functions.

For an overview of the project structure please refer to the [Gatsby documentation - Building with Components](https://www.gatsbyjs.org/docs/building-with-components/).

To view the live site: https://www.lipslut.com/

![alt text](https://github.com/SKaplan01/lipslut2.0/blob/master/src/images/lipslutGif.gif "Lipslut Gif")

As interns for working on lipslut.com, we updated the navigation bar and added dynamic components for the product details page, ingredients list, and voting popup.

![alt text](https://github.com/SKaplan01/lipslut2.0/blob/master/src/images/ls_ingredients.gif "Lipslut Ingredients")

I also really enjoyed helping to create a data visualization of lipstick sales in each state (see below). Lipslut is a product with a progressive mission and the team was surprised by the geographic breakdown of the sales data. Our goal was to create a visual representation of the data that would highlight purchases that occurred in these surprising states.

![alt text](https://github.com/SKaplan01/lipslut2.0/blob/master/src/images/ls_data_vis.gif "Lipslut Data Visualization")

Another goal was to ensure a fast build time while processing a large dataset. We used Gatsby’s onPreBootstrap lifecycle method to run a function in Node that read and aggregated thousands of lines of sales data from a csv before building nodes to create the data visualization, which shaved almost two minutes off the build time.

Lead Engineer: [Niki Esfandiari](https://github.com/NEsfandiari)

Collaborators:
* [Victor Marks](https://github.com/victor-marks)
* [Andrew Pungprakearti](https://github.com/pungprakearti)
* [Glenn Ramel](https://github.com/gramel)

