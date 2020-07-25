library(ggplot2)
library(gganimate)
library(gapminder)

theme_set(theme_bw())

p <- ggplot(
  gapminder, 
  aes(x = gdpPercap, y=lifeExp, size = pop, colour = country)
  ) +
  geom_point(show.legend = FALSE, alpha = 0.7) +
  scale_color_viridis_d() +
  scale_size(range = c(2, 12)) +
  scale_x_log10() +
  labs(x = "GDP per capita", y = "Life expectancy") + 
  transition_time(year)

anim <- animate(p)

anim_save("filenamehere.gif", anim)
