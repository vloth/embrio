library(Rcpp)
library(ggplot2)
library(dplyr)
 
opt = theme(legend.position  = "none",
            panel.background = element_rect(fill="#333333"),
            axis.ticks       = element_blank(),
            panel.grid       = element_blank(),
            axis.title       = element_blank(),
            axis.text        = element_blank())
 
cppFunction('DataFrame createTrajectory(int n, double x0, double y0, 
            double a, double b, double c, double d) {
            NumericVector x(n); NumericVector y(n);
            x[0]=x0; y[0]=y0;
            for(int i = 1; i < n; ++i) {
            x[i] = sin(a*y[i-1])+c*cos(a*x[i-1]);
            y[i] = sin(b*x[i-1])+d*cos(b*y[i-1]);
            }
            return DataFrame::create(_["x"]= x, _["y"]= y);
            }
            ')
 
a=-1.24458046630025
b=-1.75191834103316 
c=-1.71590817030519 
d=2.0866735205056
 
df=createTrajectory(10000000, 0, 0, a, b, c, d)
 
png("attractor.png", units="px", width=1600, height=1600, res=200)
ggplot(df, aes(x, y)) + geom_point(color="white", shape=46, alpha=.01) + opt
dev.off()
