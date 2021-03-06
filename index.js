const alfy = require("alfy");

alfy
  .fetch("https://www.kickstarter.com/projects/search.json", {
    query: { term: alfy.input },
    json: true,
    transform: body => body.projects
  })
  .then(projects => {
    const items = projects.map(project => {
      const {
        name,
        urls,
        pledged,
        goal,
        currency,
        state,
        creator
      } = project;
      const funding = goal ? `${Math.round(pledged / goal * 100)}%` : "0%";
      const raised = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency,
        minimumFractionDigits: 0
      }).format(pledged);
      return {
        title: name,
        subtitle: `${state} | by ${creator.name} | ${funding} | ${raised}`,
        arg: urls.web.project,
        quicklookurl: urls.web.project
      };
    });
    alfy.output(items);
  });
