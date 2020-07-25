library(Rcpp)
library(ggplot2)
library(dplyr)
 
opt = theme(legend.position  = "none",
            panel.background = element_rect(fill="#333333"),
            axis.ticks       = element_blank(),
            panel.grid       = element_blank(),
            axis.title       = element_blank(),
            axis.text        = element_blank())

cppFunction('DataFrame createTrajectory(int n, double x0, double y0, double t0, 
            double a, double b, double c, double d, double e, double f, double v) {
            // create the columns
            NumericVector x(n);
            NumericVector y(n);
            NumericVector t(n);
            x[0]=x0;
            y[0]=y0;
            t[0]=t0;
            for(int i = 1; i < n; ++i) {
            x[i] = a*sin(a*y[i-1])-d*sin(e*t[i-1])*sin(e*t[i-1]);
            y[i] = a*sin(b*x[i-1])-c*cos(b*y[i-1])+d*sin(f*t[i-1]);
            t[i] = t[i-1]+v;
            }
            // return a new data frame
            return DataFrame::create(_["x"]= x, _["y"]= y);
            }
            ')

a=7
b=-20
c=1.3
d=-12.2
e=23.34934890
f=90
v=0.7

df=createTrajectory(5000000, 0, 0, 0, a, b, c, d, e, f, v)

ggplot(df, aes(x, y)) + geom_point(color="#dfdfdf", shape=46, alpha=.01) + opt
ggsave("ratchet_3.png", device = "png")
