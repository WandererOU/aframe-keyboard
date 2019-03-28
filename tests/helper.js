module.exports.sceneFactory = function(opts) {
  const scene = document.createElement('a-scene');
  const assets = document.createElement('a-assets');
  scene.appendChild(assets);

  opts = opts || {};

  if (opts.assets) {
    opts.assets.forEach(function(asset) {
      const el = utils.createHtmlNodeFromString(asset);
      assets.appendChild(el);
    });
  }
  if (opts.entity) {
    const entity = utils.createHtmlNodeFromString(opts.entity);
    scene.appendChild(entity);
  }
  if (opts.entities) {
    for (let i = 0; i < opts.entities.length; i++) {
      const entity = utils.createHtmlNodeFromString(opts.entities[i]);
      scene.appendChild(entity);
    }
  }

  document.body.appendChild(scene);
  return scene;
};

module.exports.entityFactory = function entityFactory(opts) {
  const entity = document.createElement('a-entity');
  for (option in opts) {
    entity.setAttribute(option, opts[option]);
  }
  return entity;
};
