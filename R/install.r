#!/usr/bin/env r
if (is.null(argv) | length(argv)<1) {
  cat("Usage: installr.r pkg1 [pkg2 pkg3 ...]\n")
  q()
}

repos <- "https://www.freestatistics.org/cran/"
install.packages(argv, repos)
