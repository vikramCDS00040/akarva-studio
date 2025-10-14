const Stats = () => {
  const stats = [
    { number: "100+", label: "Projects Delivered" },
    { number: "50+", label: "Happy Clients" },
    { number: "5+", label: "Years of Expertise" },
    { number: "Global", label: "India • UK • US • UAE" },
  ];

  return (
    <section id="stats" className="py-20 bg-secondary/30">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="text-center p-6 rounded-lg bg-card/50 backdrop-blur-sm border border-border/50 hover-lift"
            >
              <div className="text-4xl md:text-5xl font-serif font-bold text-gradient-gold mb-2">
                {stat.number}
              </div>
              <div className="text-sm md:text-base text-muted-foreground">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;
