/*
 * rovo-data.js — shared loader for the Rovo Credits toolkit.
 * All three tools (estimator, scenarios, capabilities) import THIS instead of
 * hardcoding rates/allowances. Numbers live in data/rovo-rates.json only.
 *
 * Usage in a tool:
 *   <script src="../shared/rovo-data.js"></script>
 *   <script>
 *     RovoData.load().then(cfg => { buildUI(cfg); });
 *   </script>
 *
 * GitHub Pages serves the JSON same-origin, so no CORS issue.
 */
(function (global) {
  "use strict";

  // Path from a tool subfolder (estimator/, scenarios/, capabilities/) up to data/.
  var DEFAULT_PATH = "../data/rovo-rates.json";
  var _cache = null;
  var _fromFallback = false;   // true when we loaded the embedded copy (file:// / fetch blocked)

  function load(path) {
    if (_cache) return Promise.resolve(_cache);
    return fetch(path || DEFAULT_PATH, { cache: "no-cache" })
      .then(function (r) {
        if (!r.ok) throw new Error("rovo-rates.json failed to load: " + r.status);
        return r.json();
      })
      .then(function (cfg) { _cache = cfg; _fromFallback = false; return cfg; })
      .catch(function (err) {
        // fetch blocked (opened via file://) or JSON missing — fall back to the
        // generated embedded copy if the tool included data/rovo-rates.embedded.js.
        if (typeof window !== "undefined" && window.ROVO_RATES_EMBEDDED) {
          _cache = window.ROVO_RATES_EMBEDDED;
          _fromFallback = true;
          return _cache;
        }
        throw err;   // no embedded copy available — surface the original error
      });
  }

  function isFallback() { return _fromFallback; }

  // ---- accessors so tools read intent, not raw JSON paths ----
  function allowance(edition, app) {
    return _cache.allowances.byEdition[edition][app];
  }
  function rate(id) {
    var i = _cache.rateCard.interactions.find(function (x) { return x.id === id; });
    return i ? i.rate : 0;
  }
  function interaction(id) {
    return _cache.rateCard.interactions.find(function (x) { return x.id === id; });
  }
  // Shared UI label — terminology lives in the config, not hardcoded in each tool.
  function label(key) {
    return (_cache.labels && _cache.labels[key] != null) ? _cache.labels[key] : key;
  }
  // Canonical term + definition from the terminology block.
  function term(key) {
    return _cache.terminology && _cache.terminology[key];
  }
  function lastVerifiedISO() { return _cache._meta.lastVerified; }
  function lastVerifiedDMY() {
    var p = _cache._meta.lastVerified.split("-");
    return p.length === 3 ? (p[2] + "/" + p[1] + "/" + p[0]) : _cache._meta.lastVerified;
  }
  // ---- Customer 360 panel parsing (Phase 1) ----
  // Parse a Rovo capabilities panel CSV (interactions or MAU). Rows are capability
  // names; columns are months. Returns { latest, latestMonth, series } per mapped field.
  // `which` = "interactions" | "mau".
  function parseC360Panel(csvText, which) {
    var pm = _cache.c360Mapping.panels[which];
    if (!pm) return {};
    var lines = csvText.split(/\r?\n/).filter(function (l) { return l.trim(); });
    if (lines.length < 2) return {};
    var header = splitCsv(lines[0]);
    var monthCols = header.slice(1); // first col is the capability label
    var out = {};
    for (var r = 1; r < lines.length; r++) {
      var cells = splitCsv(lines[r]);
      var rowName = cells[0].trim();
      var spec = pm.rows[rowName];
      if (!spec) continue;
      var series = monthCols.map(function (m, i) {
        return { month: m.trim(), value: toNum(cells[i + 1]) };
      }).filter(function (p) { return !isNaN(p.value); });
      if (!series.length) continue;
      var latest = series[series.length - 1];
      out[spec.estimatorField] = {
        latest: latest.value, latestMonth: latest.month,
        series: series, billable: !!spec.billable, rateId: spec.rateId
      };
    }
    return out;
  }

  function splitCsv(line) { return line.split(","); }
  function toNum(v) { return parseFloat(String(v == null ? "" : v).replace(/[^0-9.\-]/g, "")); }

  function editionFromSegment(seg) {
    var s = String(seg || "").toLowerCase();
    if (s.indexOf("enterprise") >= 0) return "Enterprise";
    if (s.indexOf("premium") >= 0) return "Premium";
    if (s.indexOf("standard") >= 0) return "Standard";
    return null;
  }

  global.RovoData = {
    load: load,
    isFallback: isFallback,
    get config() { return _cache; },
    allowance: allowance,
    rate: rate,
    interaction: interaction,
    label: label,
    term: term,
    lastVerifiedISO: lastVerifiedISO,
    lastVerifiedDMY: lastVerifiedDMY,
    parseC360Panel: parseC360Panel,
    editionFromSegment: editionFromSegment
  };
})(typeof window !== "undefined" ? window : this);
