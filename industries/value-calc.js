/*
 * value-calc.js — reusable, config-driven value/ROI calculator engine.
 * One engine. One config object per trade. Drop into any /industries/<trade>/ page,
 * or embed on a client's own site as a homeowner lead magnet.
 *
 * Usage:
 *   <div id="calc"></div>
 *   <script src="/industries/value-calc.js"></script>
 *   <script>ValueCalc.mount('calc', ROOFING_CALC_CONFIG);</script>
 *
 * Config shape:
 *   {
 *     accent:   '#ff8a3c',            // optional, themes the result number
 *     inputs:   [ {id,label,type,default,min,max,step,help,options} ],
 *     cta:      { label, href },      // button shown under the result
 *     compute:  function(v){ return { headline:{label,value}, cards:[...], math:'...' } }
 *   }
 *   - type 'number'  -> numeric input
 *   - type 'select'  -> dropdown; each option {label,value,...extra}; selected option
 *                       object is passed to compute as v[id_opt]
 *   compute receives v = { <id>: Number|String, <id>_opt: <selected option object> }
 */
(function () {
  function money(n) { return '$' + Math.round(n).toLocaleString(); }

  function buildInput(inp) {
    var wrap = document.createElement('div');
    wrap.className = 'vc-field';

    var label = document.createElement('label');
    label.setAttribute('for', 'vc-' + inp.id);
    label.textContent = inp.label;
    wrap.appendChild(label);

    var control;
    if (inp.type === 'select') {
      control = document.createElement('select');
      (inp.options || []).forEach(function (opt, i) {
        var o = document.createElement('option');
        o.value = String(i);
        o.textContent = opt.label;
        control.appendChild(o);
      });
    } else {
      control = document.createElement('input');
      control.type = 'number';
      if (inp.min != null) control.min = inp.min;
      if (inp.max != null) control.max = inp.max;
      if (inp.step != null) control.step = inp.step;
      if (inp.default != null) control.value = inp.default;
    }
    control.id = 'vc-' + inp.id;
    control.className = 'vc-input';
    wrap.appendChild(control);

    if (inp.help) {
      var help = document.createElement('div');
      help.className = 'vc-help';
      help.textContent = inp.help;
      wrap.appendChild(help);
    }
    return wrap;
  }

  function readValues(cfg) {
    var v = {};
    cfg.inputs.forEach(function (inp) {
      var node = document.getElementById('vc-' + inp.id);
      if (inp.type === 'select') {
        var idx = parseInt(node.value, 10) || 0;
        var opt = (inp.options || [])[idx] || {};
        v[inp.id] = opt.value;
        v[inp.id + '_opt'] = opt;
      } else {
        var n = parseFloat(node.value);
        v[inp.id] = isNaN(n) ? (inp.default || 0) : n;
      }
    });
    return v;
  }

  function renderResult(host, cfg, out) {
    var html = '';
    if (out.headline) {
      html += '<div class="vc-headline-label">' + (out.headline.label || '') + '</div>';
      html += '<div class="vc-headline">' + out.headline.value + '</div>';
    }
    if (out.cards && out.cards.length) {
      html += '<div class="vc-cards">';
      out.cards.forEach(function (c) {
        html += '<div class="vc-card">' +
          '<div class="vc-card-num">' + c.value + '</div>' +
          '<div class="vc-card-label">' + c.label + '</div>' +
          (c.note ? '<div class="vc-card-note">' + c.note + '</div>' : '') +
          '</div>';
      });
      html += '</div>';
    }
    if (out.math) html += '<div class="vc-math">' + out.math + '</div>';
    if (cfg.cta) {
      html += '<a class="vc-cta" href="' + cfg.cta.href + '" target="_blank" rel="noopener">' +
        cfg.cta.label + '</a>';
    }
    host.innerHTML = html;
    host.classList.add('show');
    setTimeout(function () {
      host.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 80);
  }

  var ValueCalc = {
    money: money,
    mount: function (containerId, cfg) {
      var root = document.getElementById(containerId);
      if (!root) return;
      if (cfg.accent) root.style.setProperty('--vc-accent', cfg.accent);

      var form = document.createElement('div');
      form.className = 'vc-grid';
      cfg.inputs.forEach(function (inp) { form.appendChild(buildInput(inp)); });

      var btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'vc-button';
      btn.textContent = cfg.buttonLabel || 'Calculate';

      var result = document.createElement('div');
      result.className = 'vc-result';

      root.appendChild(form);
      root.appendChild(btn);
      root.appendChild(result);

      btn.addEventListener('click', function () {
        var v = readValues(cfg);
        var out = cfg.compute(v, money);
        renderResult(result, cfg, out);
        if (typeof window.gtag === 'function') {
          window.gtag('event', 'value_calc', { trade: cfg.trade || 'unknown' });
        }
      });
    }
  };

  window.ValueCalc = ValueCalc;
})();
