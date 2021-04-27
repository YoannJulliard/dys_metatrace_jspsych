library(tidyverse)
#install.packages("dplyr")
library(glue)

setwd(dirname(rstudioapi::getActiveDocumentContext()$path))

# coord_radar -------------------------------------------------------------
# See https://stackoverflow.com/questions/42562128/ggplot2-connecting-points-in-polar-coordinates-with-a-straight-line-2
coord_radar <- function (theta = "x", start = 0, direction = 1) {
  theta <- match.arg(theta, c("x", "y"))
  r <- if (theta == "x") "y" else "x"
  ggproto("CordRadar", CoordPolar, theta = theta, r = r, start = start, 
          direction = sign(direction),
          is_linear = function(coord) TRUE)
}

size <- 2
x1 <- 0
x2 <- 10
y1 <- 0
y2 <- 100

ggplot() +
  geom_line(data = data.frame(x = c(x1, x2), y = c(y1, y2)),
            aes(x = x, y = y), size = size) +
  scale_x_continuous(limits = c(0, 360), breaks = seq(0, 360, by = 20)) +
  scale_y_continuous(limits = c(0, 100), breaks = seq(0, 100, by = 10)) +
  coord_radar() #+
  #theme_void()

# Looping the procedure for various sizes and x2 coordinate

#thickness of line (10 level of difficulty)
size_seq <- seq(1, 5, by = 0.5)
#coordinates of start point: always in center
x1 <- 0
y1 <- 0
#coordinates of end point: keep the same lenght but with different orientations
x2_seq <- seq(0, 360, by = 10)
y2 <- 100

for (size in size_seq) {
  for (x2 in x2_seq) {
    ggplot() +
      geom_line(data = data.frame(x = c(x1, x2), y = c(y1, y2)),
                aes(x = x, y = y), size = size) +
      scale_x_continuous(limits = c(0, 360)) +
      scale_y_continuous(limits = c(0, 100)) +
      coord_radar() +
      theme_void()
    
    ggsave(filename = glue("{x2}_{size}.png"), path = "figures/", plot = last_plot(),
           width = 500/300, height = 500/300, dpi = 300)
  }
}

# --------------------------- DEPRECATED ------------------------------------
# cartesian coord -----------------------------------------------------------

ggplot() +
  geom_line(data = data.frame(x = c(0,15), y = c(0,15)),
            aes(x = x, y = y))

ggplot() +
  geom_line(data = data.frame(x = c(0,15), y = c(0,15)),
            aes(x = x, y = y), size = 2) +
  theme_void()

ggplot() +
  geom_line(data = data.frame(x = c(20,80), y = c(20,80)),
            aes(x = x, y = y), size = 3) +
  scale_x_continuous(limits = c(0, 100)) +
  scale_y_continuous(limits = c(0, 100)) +
  theme_void()

ggsave(filename = "test.png", plot = last_plot(),
       width = 500/300, height = 500/300, dpi = 300)

size = seq(1, 10, by = 1)

for (size in size) {
  
  ggplot() +
    geom_line(data = data.frame(x = c(20,80), y = c(20,80)),
              aes(x = x, y = y), size = size) +
    scale_x_continuous(limits = c(0, 100)) +
    scale_y_continuous(limits = c(0, 100)) +
    theme_void()
  
  ggsave(filename = glue("20_80_{size}.png"), path = "figures/", plot = last_plot(),
         width = 500/300, height = 500/300, dpi = 300)
}

size <- 2
x1 <- 50
x2 <- 80
y1 <- 50
y2 <- 80

ggplot() +
  geom_line(data = data.frame(x = c(x1, x2), y = c(y1, y2)),
            aes(x = x, y = y), size = size) +
  scale_x_continuous(limits = c(0, 100)) +
  scale_y_continuous(limits = c(0, 100)) +
  theme_void()

