function doGet(e) {
  const action = (e && e.parameter && e.parameter.action) || 'get';

  if (action === 'get') {
    return jsonResponse({
      count: getCount()
    });
  }

  return jsonResponse({
    success: false,
    message: 'Unsupported action'
  });
}

function doPost(e) {
  let data = {};

  try {
    if (e && e.postData && e.postData.contents) {
      data = JSON.parse(e.postData.contents);
    }
  } catch (err) {
    data = {};
  }

  const action = data.action || 'increment';

  if (action === 'increment') {
    const count = getCount() + 1;
    PropertiesService.getScriptProperties().setProperty('VISIT_COUNT', String(count));

    return jsonResponse({
      success: true,
      count: count
    });
  }

  if (action === 'get') {
    return jsonResponse({
      success: true,
      count: getCount()
    });
  }

  return jsonResponse({
    success: false,
    message: 'Unsupported action'
  });
}

function getCount() {
  const value = PropertiesService.getScriptProperties().getProperty('VISIT_COUNT');
  return Number(value || 0);
}

function jsonResponse(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
