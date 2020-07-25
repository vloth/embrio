FROM rocker/r-devel

RUN R -e "options(repos = \
  list(CRAN = 'https://www.freestatistics.org/cran/')); \
  install.packages('Rcpp'); \
  install.packages('ggplot2'); \
  install.packages('dplyr');"

COPY ./attractor.R /home/R/attractor.R

CMD R -e "source('/home/R/attractor.R')"
