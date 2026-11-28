(function () {
  "use strict";
  const categories = [
    { id: "all", label: "Все" },
    { id: "profile", label: "Профиль" },
    { id: "birthday", label: "Дни рождения и рест" },
    { id: "community", label: "Кланы и кружки" },
    { id: "saved", label: "Заметки и закладки" },
    { id: "social", label: "Напарничество" },
    { id: "reputation", label: "Репутация" },
    { id: "stats", label: "Статистика" },
    { id: "economy", label: "Жетоны" },
    { id: "pets", label: "Питомец и дом" },
    { id: "events", label: "Розыгрыши" }
  ];
  const commands = [
    // Profile and questionnaire
    {cat:"profile",title:"Справка по анкетам",cmd:"/jf_profile",desc:"Открыть справку по функциям анкеты."},
    {cat:"profile",title:"Моя анкета",cmd:"Моя анкета",desc:"Показать свою анкету."},
    {cat:"profile",title:"Анкета участника",cmd:"Анкета @username",desc:"Посмотреть анкету участника. Вместо @username укажи его Telegram-ник."},
    {cat:"profile",title:"Разрешить просмотр анкеты",cmd:"+анкета",desc:"Открыть свою анкету другим участникам."},
    {cat:"profile",title:"Скрыть анкету",cmd:"-анкета",desc:"Закрыть анкету от просмотра другими участниками."},
    {cat:"profile",title:"Установить ник",cmd:"+ник [текст]",desc:"Задать отображаемый ник. Замени [текст] на желаемый ник."},
    {cat:"profile",title:"Посмотреть ник",cmd:"ник",desc:"Показать ник участника. Можно ответить на его сообщение, чтобы запросить ник конкретного человека."},
    {cat:"profile",title:"Удалить ник",cmd:"ник удалить",desc:"Удалить установленный ник."},
    {cat:"profile",title:"Установить звание",cmd:"+звание [текст]",desc:"Добавить личное звание в анкету."},
    {cat:"profile",title:"Посмотреть звание",cmd:"звание",desc:"Показать личное звание участника."},
    {cat:"profile",title:"Удалить звание",cmd:"звание удалить",desc:"Убрать своё личное звание."},
    {cat:"profile",title:"Добавить информацию о себе",cmd:"О себе\n[текст]",desc:"Добавить описание в анкету. Текст отправляется следующей строкой."},
    {cat:"profile",title:"Удалить описание",cmd:"-о себе",desc:"Удалить описание из анкеты."},
    {cat:"profile",title:"Установить девиз",cmd:"+девиз [текст]",desc:"Сохранить личный девиз."},
    {cat:"profile",title:"Посмотреть девиз",cmd:"девиз",desc:"Показать девиз участника."},
    {cat:"profile",title:"Удалить девиз",cmd:"-девиз",desc:"Удалить свой девиз."},
    // Birthday and rest
    {cat:"birthday",title:"Сохранить день рождения",cmd:"др 24.03",desc:"Указать свою дату рождения в формате день.месяц."},
    {cat:"birthday",title:"Список дней рождения",cmd:"/jf_birthdays",desc:"Посмотреть ближайшие дни рождения участников."},
    {cat:"birthday",title:"Взять рест на срок",cmd:"взять рест на 7 дней",desc:"Оформить самостоятельный рест во флуде. Максимум 14 дней."},
    {cat:"birthday",title:"Взять рест до даты",cmd:"взять рест до 15.11",desc:"Оформить самостоятельный рест до указанной даты. Максимум 14 дней."},
    {cat:"birthday",title:"Список отдыхающих",cmd:"рестники",desc:"Посмотреть, кто сейчас на ресте и до какого числа."},
    // clans
    {cat:"community",title:"Справка по кланам, кружкам, заметкам и закладкам",cmd:"/jf_community",desc:"Открыть справку по сообществу."},
    {cat:"community",title:"Создать клан",cmd:"Создать клан [название]\n[описание]",desc:"Создать клан. Название указывается в первой строке, описание необязательно следующей строкой."},
    {cat:"community",title:"Каталог кланов и кружков",cmd:"каталог сообществ",desc:"Открыть общий каталог кланов и кружков этого чата."},
    {cat:"community",title:"Список кланов",cmd:"кланы",desc:"Показать список созданных кланов."},
    {cat:"community",title:"Мой клан",cmd:"мой клан",desc:"Показать сведения о своём клане."},
    {cat:"community",title:"Вступить в клан",cmd:"клан вступить [ID]",desc:"Вступить в клан по его номеру из каталога."},
    {cat:"community",title:"Участники клана",cmd:"участники клана [ID]",desc:"Посмотреть состав клана по номеру."},
    {cat:"community",title:"Изменить клан",cmd:"клан изменить [ID] [название]",desc:"Изменить название своего клана по его ID."},
    {cat:"community",title:"Выйти из клана",cmd:"выйти из клана",desc:"Покинуть свой клан."},
    {cat:"community",title:"Удалить клан",cmd:"удалить клан [ID]",desc:"Удалить свой клан по номеру. Администрация также может удалить клан."},
    // circles
    {cat:"community",title:"Создать кружок",cmd:"Создать кружок [название]",desc:"Создать тематический кружок."},
    {cat:"community",title:"Список кружков",cmd:"кружки",desc:"Показать все кружки чата."},
    {cat:"community",title:"Мои кружки",cmd:"мои кружки",desc:"Посмотреть кружки, в которых состоишь."},
    {cat:"community",title:"Вступить в кружок",cmd:"кружок вступить [ID]",desc:"Вступить в кружок по его ID."},
    {cat:"community",title:"Участники кружка",cmd:"участники кружка [ID]",desc:"Посмотреть состав выбранного кружка."},
    {cat:"community",title:"Выбрать основной кружок",cmd:"кружок основа [ID]",desc:"Установить один из своих кружков основным."},
    {cat:"community",title:"Изменить кружок",cmd:"кружок изменить [ID] [название]",desc:"Изменить название своего кружка."},
    {cat:"community",title:"Выйти из кружка",cmd:"выйти из кружка [ID]",desc:"Покинуть выбранный кружок по ID."},
    {cat:"community",title:"Удалить кружок",cmd:"удалить кружок [ID]",desc:"Удалить созданный кружок по ID."},
    // Notes
    {cat:"saved",title:"Создать заметку",cmd:"+Заметка [название]\n[текст заметки]",desc:"Создать заметку-шаблон. Название в первой строке, содержимое во второй."},
    {cat:"saved",title:"Список заметок",cmd:"заметки",desc:"Показать сохранённые заметки и их номера."},
    {cat:"saved",title:"Вызвать заметку",cmd:"заметка [ID]",desc:"Отправить сохранённую заметку по номеру."},
    {cat:"saved",title:"Изменить текст заметки",cmd:"~Заметка [ID]\n[новый текст]",desc:"Заменить содержимое заметки по ID. Новый текст укажи со следующей строки."},
    {cat:"saved",title:"Переименовать заметку",cmd:"~Название заметки [ID]\n[новое название]",desc:"Изменить название заметки по номеру."},
    {cat:"saved",title:"Удалить заметку",cmd:"-заметка [ID]",desc:"Удалить свою заметку по ID."},
    // Bookmarks
    {cat:"saved",title:"Добавить закладку",cmd:"+Закладка [название]",desc:"Ответь этой командой на сообщение, которое хочешь сохранить."},
    {cat:"saved",title:"Мои закладки",cmd:"мои закладки",desc:"Посмотреть свои сохранённые закладки."},
    {cat:"saved",title:"Альтернативный список закладок",cmd:"закладки",desc:"То же самое, что «мои закладки»: показать собственные сохранения."},
    {cat:"saved",title:"Общий чатбук",cmd:"чатбук",desc:"Открыть общий каталог опубликованных закладок."},
    {cat:"saved",title:"Открыть закладку",cmd:"закладка [ID]",desc:"Открыть закладку по её номеру."},
    {cat:"saved",title:"Удалить закладку",cmd:"-закладка [ID]",desc:"Удалить собственную закладку по ID."},
    {cat:"saved",title:"Убрать закладку из чатбука",cmd:"убрать закладку [ID]",desc:"Скрыть свою закладку из общего каталога."},
    // Social / partners
    {cat:"social",title:"Справка по напарничеству",cmd:"/jf_social",desc:"Открыть справку о добровольных социальных связях."},
    {cat:"social",title:"Предложить напарничество",cmd:".отн запрос",desc:"Отправь команду ответом на сообщение участника. Связь создаётся только после согласия."},
    {cat:"social",title:"Принять приглашение",cmd:".отн да",desc:"Принять ожидающее приглашение в напарники."},
    {cat:"social",title:"Отклонить приглашение",cmd:".отн нет",desc:"Отклонить ожидающее приглашение."},
    {cat:"social",title:"Мои напарники / связь",cmd:".отн я",desc:"Посмотреть текущую добровольную связь."},
    {cat:"social",title:"Список связей",cmd:".отн список",desc:"Показать добровольные связи в чате."},
    {cat:"social",title:"Топ напарничеств",cmd:".отн топ",desc:"Показать наиболее длительные связи."},
    {cat:"social",title:"Справка по социальным функциям",cmd:".отн документ",desc:"Получить описание функций и принципов согласия."},
    {cat:"social",title:"Статистика связей",cmd:".отн стата",desc:"Посмотреть статистику приглашений и активных связей."},
    {cat:"social",title:"История приглашений",cmd:".отн история связи",desc:"Посмотреть собственную историю приглашений и ответов."},
    {cat:"social",title:"Уровень отношений",cmd:".отн уровень",desc:"Показать общий уровень и прогресс добровольной связи."},
    {cat:"social",title:"Искры отношений",cmd:".отн искры",desc:"Посмотреть общий баланс искр пары. Это отдельная валюта от личных жетонов."},
    {cat:"social",title:"Список дружеских действий",cmd:"действия",desc:"Показать каталог доступных нейтральных дружеских действий."},
    {cat:"social",title:"Выполнить дружеское действие",cmd:"действие",desc:"Ответь командой на сообщение участника и следуй подсказкам бота."},
    {cat:"social",title:"Поддержать участника",cmd:".отн поддержать",desc:"Ответом на сообщение отправить нейтральные слова поддержки."},
    {cat:"social",title:"Поздравить участника",cmd:".отн поздравить",desc:"Ответом на сообщение отправить поздравление."},
    {cat:"social",title:"Похвалить участника",cmd:".отн похвалить",desc:"Ответом на сообщение отправить похвалу."},
    {cat:"social",title:"Дать пять",cmd:".отн дать пять",desc:"Ответом на сообщение отправить виртуальную пятёрку."},
    {cat:"social",title:"Контроль и границы связи",cmd:".отн контроль",desc:"Справка о правилах согласия и прекращения связи. Не предназначена для слежки или управления другим участником."},
    {cat:"social",title:"Завершить напарничество",cmd:".отн расторгнуть",desc:"Завершить действующую связь. Статус снимается у обоих участников."},
    // Reputation
    {cat:"reputation",title:"Справка по репутации",cmd:"/jf_reputation",desc:"Открыть справку по репутации."},
    {cat:"reputation",title:"Рейтинг участников",cmd:"рейтинг",desc:"Показать рейтинг участников чата."},
    {cat:"reputation",title:"Моя репутация",cmd:"моя репутация",desc:"Посмотреть собственную репутацию."},
    {cat:"reputation",title:"Репутация участника",cmd:"звёздность",desc:"Посмотреть репутацию участника. Можно ответить на его сообщение."},
    {cat:"reputation",title:"Поставить оценку",cmd:"+1",desc:"Ответом на сообщение поставить положительную оценку. Также доступны +2 и +3."},
    // Statistics
    {cat:"stats",title:"Справка по статистике",cmd:"/jf_stats",desc:"Открыть справку по статистическим командам."},
    {cat:"stats",title:"Информация о чате",cmd:"чат инфо",desc:"Показать общую информацию о чате."},
    {cat:"stats",title:"Статистика чата",cmd:"чат стата",desc:"Посмотреть статистику чата."},
    {cat:"stats",title:"Активность по часам",cmd:"стата по часам",desc:"Показать активность по часам."},
    {cat:"stats",title:"Моя статистика",cmd:"моя стата",desc:"Посмотреть личную статистику сообщений."},
    {cat:"stats",title:"Старожилы",cmd:"олды",desc:"Показать список старожилов чата."},
    {cat:"stats",title:"Новички",cmd:"новички",desc:"Показать недавно вступивших участников."},
    {cat:"stats",title:"Топ активности",cmd:"топ",desc:"Показать рейтинг сообщений за выбранный период."},
    // Economy
    {cat:"economy",title:"Справка по жетонам",cmd:"/jf_economy",desc:"Открыть справку по экономике бота."},
    {cat:"economy",title:"Баланс",cmd:"Баланс",desc:"Посмотреть свой баланс жетонов."},
    {cat:"economy",title:"Топ богатых",cmd:"топ богатых",desc:"Показать рейтинг жетонов в чате."},
    {cat:"economy",title:"Получить жетоны",cmd:"Ферма",desc:"Получить 5–50 жетонов. Повторный сбор доступен раз в 4 часа."},
    {cat:"economy",title:"Магазин",cmd:"Магазин",desc:"Посмотреть доступные предметы и цены."},
    {cat:"economy",title:"Купить предмет",cmd:"Купить [название]",desc:"Купить предмет из магазина по его названию."},
    {cat:"economy",title:"Инвентарь",cmd:"Инвентарь",desc:"Посмотреть свои приобретённые предметы."},
    {cat:"economy",title:"Надеть предмет",cmd:"Надеть [название]",desc:"Установить купленный предмет в профиль или витрину."},
    {cat:"economy",title:"Снять предмет",cmd:"Снять [слот]",desc:"Освободить выбранный слот оформления."},
    {cat:"economy",title:"Подарить предмет",cmd:"Подарить [название]",desc:"Ответь на сообщение получателя, чтобы передать ему предмет."},
    {cat:"economy",title:"Витрина подарков",cmd:"отн подарок витрина общая",desc:"Показать последние подарки сообщества. Вариант «моя» покажет полученные тобой."},
    {cat:"economy",title:"Перевести жетоны",cmd:"Перевести [сумма]",desc:"Ответь на сообщение получателя. Действует дневной лимит."},
    {cat:"economy",title:"Перевести искры отношений",cmd:"отн искры подарок [сумма]",desc:"Ответом на сообщение напарника перевести искры. Это отдельная валюта от обычных жетонов."},
    {cat:"economy",title:"История жетонов",cmd:"отн история доход",desc:"Посмотреть собственную историю операций. Можно указать «расход» вместо «доход»."},
    {cat:"economy",title:"Задания",cmd:"Задания",desc:"Посмотреть ежедневные задания и прогресс."},
    {cat:"economy",title:"Достижения",cmd:"Достижения",desc:"Посмотреть заработанные игровые достижения."},
    // Pets and house
    {cat:"pets",title:"Справка о питомцах и доме",cmd:"/jf_pets",desc:"Открыть справку и каталог виртуальных питомцев."},
    {cat:"pets",title:"Каталог питомцев",cmd:"Питомцы",desc:"Показать список доступных компаньонов."},
    {cat:"pets",title:"Выбрать питомца",cmd:"Питомец выбрать кот",desc:"Выбрать компаньона. В примере указан кот; также доступны кошка, пёс, собака, лиса, кролик, сова и дракон. Выбор постоянный."},
    {cat:"pets",title:"Мой питомец",cmd:"Мой питомец",desc:"Посмотреть карточку своего виртуального компаньона."},
    {cat:"pets",title:"Переименовать питомца",cmd:"Питомец имя [имя]",desc:"Изменить имя своего компаньона."},
    {cat:"pets",title:"Погладить питомца",cmd:"Питомец погладить",desc:"Взаимодействовать с компаньоном. Действия ограничены коротким кулдауном."},
    {cat:"pets",title:"Поиграть с питомцем",cmd:"Питомец поиграть",desc:"Игровое взаимодействие с компаньоном."},
    {cat:"pets",title:"Похвалить питомца",cmd:"Питомец похвалить",desc:"Похвалить компаньона."},
    {cat:"pets",title:"Покормить питомца",cmd:"Питомец покормить",desc:"Покормить компаньона."},
    {cat:"pets",title:"История питомца",cmd:"Питомец история",desc:"Посмотреть историю взаимодействий."},
    {cat:"pets",title:"Достижения питомца",cmd:"Питомец достижения",desc:"Посмотреть достижения своего компаньона."},
    {cat:"pets",title:"Дом питомца",cmd:"Дом",desc:"Открыть свой виртуальный дом и текущее оформление."},
    {cat:"pets",title:"Комнаты дома",cmd:"Дом комнаты",desc:"Посмотреть доступные комнаты и стоимость их открытия."},
    {cat:"pets",title:"Открыть комнату",cmd:"Дом открыть библиотека",desc:"Открыть декоративную комнату за жетоны. В примере библиотека."},
    {cat:"pets",title:"Улучшить дом",cmd:"Дом улучшить",desc:"Повысить уровень дома за жетоны."},
    {cat:"pets",title:"Оформить дом",cmd:"Дом оформить сад",desc:"Выбрать оформление дома. В примере используется сад."},
    {cat:"pets",title:"Действия дома",cmd:"Дом действия",desc:"Посмотреть варианты оформления."},
    // Free raffles
    {cat:"events",title:"Справка по розыгрышам",cmd:"/jf_raffles",desc:"Открыть справку по бесплатным розыгрышам."},
    {cat:"events",title:"Статус розыгрыша",cmd:"розыгрыш статус",desc:"Посмотреть текущий розыгрыш."},
    {cat:"events",title:"Участвовать",cmd:"участвую",desc:"Войти в текущий бесплатный розыгрыш."},
    {cat:"events",title:"Выйти из розыгрыша",cmd:"выйти из розыгрыша",desc:"Отказаться от участия в текущем розыгрыше."},
    {cat:"events",title:"Победители",cmd:"победители розыгрыша",desc:"Посмотреть результаты последних розыгрышей."}
  ];

  const filterRoot = document.getElementById("commands-filter");
  const listRoot = document.getElementById("commands-list");
  const search = document.getElementById("commands-search");
  const count = document.getElementById("commands-count");
  const empty = document.getElementById("commands-empty");
  const toast = document.getElementById("commands-toast");
  let activeCategory = "all";
  let toastTimer = 0;

  const showToast = (message) => {
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add("is-visible");
    window.clearTimeout(toastTimer);
    toastTimer = window.setTimeout(() => toast.classList.remove("is-visible"), 1800);
  };
  const escapeHtml = (value) => String(value).replace(/[&<>"']/g, (char) => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[char]));
  const copyText = async (value) => {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(value);
      } else {
        const field = document.createElement("textarea");
        field.value = value;
        field.setAttribute("readonly", "");
        field.style.position = "fixed";
        field.style.opacity = "0";
        field.style.pointerEvents = "none";
        document.body.appendChild(field);
        field.select();
        const ok = document.execCommand("copy");
        field.remove();
        if (!ok) throw new Error("copy unavailable");
      }
      showToast("Команда скопирована");
    } catch (_) {
      showToast("Не удалось скопировать. Выдели команду вручную.");
    }
  };

  if (filterRoot) {
    filterRoot.innerHTML = categories.map((item) => `<button type="button" class="commands-chip${item.id === "all" ? " is-active" : ""}" data-category="${item.id}" aria-pressed="${item.id === "all"}">${escapeHtml(item.label)}</button>`).join("");
    filterRoot.addEventListener("click", (event) => {
      const button = event.target.closest("[data-category]");
      if (!button) return;
      activeCategory = button.dataset.category;
      filterRoot.querySelectorAll("[data-category]").forEach((chip) => {
        const selected = chip === button;
        chip.classList.toggle("is-active", selected);
        chip.setAttribute("aria-pressed", String(selected));
      });
      render();
    });
  }

  function render() {
    const query = (search ? search.value : "").trim().toLocaleLowerCase("ru");
    const visible = commands.filter((item) => {
      const inCategory = activeCategory === "all" || item.cat === activeCategory;
      const searchable = `${item.title} ${item.cmd} ${item.desc}`.toLocaleLowerCase("ru");
      return inCategory && (!query || searchable.includes(query));
    });
    if (count) count.textContent = `Найдено: ${visible.length} из ${commands.length}`;
    if (empty) empty.hidden = visible.length > 0;
    if (!listRoot) return;
    const visibleCats = activeCategory === "all" ? categories.filter((item) => item.id !== "all") : categories.filter((item) => item.id === activeCategory);
    listRoot.innerHTML = visibleCats.map((category) => {
      const items = visible.filter((item) => item.cat === category.id);
      if (!items.length) return "";
      return `<section class="commands-group" aria-labelledby="commands-heading-${category.id}"><h2 id="commands-heading-${category.id}">${escapeHtml(category.label)}</h2><div class="commands-cards">${items.map((item) => `<article class="command-card"><div class="command-card-top"><h3>${escapeHtml(item.title)}</h3><button type="button" class="command-copy" data-copy="${escapeHtml(item.cmd)}" aria-label="Скопировать ${escapeHtml(item.title)}">Копировать</button></div><code class="command-code">${escapeHtml(item.cmd)}</code><p>${escapeHtml(item.desc)}</p></article>`).join("")}</div></section>`;
    }).join("");
    listRoot.querySelectorAll("[data-copy]").forEach((button) => button.addEventListener("click", () => copyText(button.getAttribute("data-copy"))));
  }
  if (search) search.addEventListener("input", render);
  render();
})();
