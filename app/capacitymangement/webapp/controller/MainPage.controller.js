sap.ui.define(
  [
    "./BaseController",
    'sap/ui/core/Fragment',
    'sap/ui/model/Filter',
    "sap/m/IconTabBar",
    "sap/m/IconTabFilter",
    "sap/ui/model/json/JSONModel",
    "sap/m/MessageToast",
    "sap/ui/model/odata/v2/ODataModel",
    "sap/m/MessageBox"
  ],
  function (Controller, Fragment, Filter, IconTabBar, IconTabFilter, JSONModel, MessageToast, ODataModel, MessageBox) {
    "use strict";

    return Controller.extend("com.app.capacitymangement.controller.MainPage", {
      onInit: function () {
        

        /**Constructing Product Model and set the model to the view */
        const oJsonModel = new JSONModel({
          sapProductno: "",
          length: "",
          width: "",
          height: "",
          volume: "",
          uom: "",
          mCategory: "",
          description: "",
          EANUPC: "",
          weight: "",
        })
        this.getView().setModel(oJsonModel, "ProductModel");

        /**Constructing JSON Model and set the model to the view*/
        const oJsonModelVeh = new JSONModel({
          truckType: "",
          length: "",
          width: "",
          height: "",
          uom: "",
          volume: "",
          truckWeight: "",
          capacity: "",
        });
        this.getView().setModel(oJsonModelVeh, "VehModel");

      },
      handleValueHelp: function (oEvent) {
        var sInputValue = oEvent.getSource().getValue(),
          oView = this.getView();

        // create value help dialog
        if (!this._pValueHelpDialog) {
          this._pValueHelpDialog = Fragment.load({
            id: oView.getId(),
            name: "com.app.capacitymangement.fragment.ProductsDialog",
            controller: this
          }).then(function (oValueHelpDialog) {
            oView.addDependent(oValueHelpDialog);
            return oValueHelpDialog;
          });
        }

        this._pValueHelpDialog.then(function (oValueHelpDialog) {
          oValueHelpDialog.open(sInputValue);
        });
      },

      handleValueHelpProductType: function (oEvent) {
        var sInputValue = oEvent.getSource().getValue(),
          oView = this.getView();
        // create value help dialog
        if (!this._pProductsDialog) {
          this._pProductsDialog = Fragment.load({
            id: oView.getId(),
            name: "com.app.capacitymangement.fragment.vehicleTypeDialog",
            controller: this
          }).then(function (oProductsDialog) {
            oView.addDependent(oProductsDialog);
            return oProductsDialog;
          });
        }

        this._pProductsDialog.then(function (oProductsDialog) {
          oProductsDialog.open(sInputValue);
        });
      },

      onPrintPressInProductsTable: function () {

        var oTable = this.byId("ProductsTable");
        var aItems = oTable.getItems();
        var aData = [];
        // Push column headers as the first row
        var aHeaders = [
          "S.No",
          "Product",
          "Product Type",
          "Product Description",
          "Dimensions",
          "Volume",
          "Weights",
          "Product Codes"
        ];
        aData.push(aHeaders);

        // Iterate through table items and collect data
        aItems.forEach(function (oItem) {
          var oCells = oItem.getCells();
          var rowData = [];
          oCells.forEach(function (oCell) {
            rowData.push(oCell.getText());
          });
          aData.push(rowData);
        });

        // Prepare Excel workbook
        var oSheet = XLSX.utils.aoa_to_sheet(aData);
        var oWorkbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(oWorkbook, oSheet, "ProductsTable");

        // Generate and download the Excel file
        XLSX.writeFile(oWorkbook, "ProductsTable.xlsx");
      },

      //print in add Equipment 
      onPressDownloadInAddVehicleTable: function () {

        var oTable = this.byId("idProductsTableEdit");
        var aItems = oTable.getItems();
        var aData = [];

        // Push column headers as the first row
        var aHeaders = [
          "S.No",
          "Vehicle",
          "Vehicle Type",
          "Dimensions",
          "Volume",
          "Weight",
          "Capacity"
        ];
        aData.push(aHeaders);

        // Iterate through table items and collect data
        aItems.forEach(function (oItem) {
          var oCells = oItem.getCells();
          var rowData = [];
          oCells.forEach(function (oCell) {
            rowData.push(oCell.getText());
          });
          aData.push(rowData);
        });

        // Prepare Excel workbook
        var oSheet = XLSX.utils.aoa_to_sheet(aData);
        var oWorkbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(oWorkbook, oSheet, "idProductsTableEdit");

        // Generate and download the Excel file
        XLSX.writeFile(oWorkbook, "VehicleTable.xlsx");
      },

      // 
      //print in list  
      onPressPrintInListTable: function () {

        var oTable = this.byId("idListTable");
        var aItems = oTable.getItems();
        var aData = [];

        // Push column headers as the first row
        var aHeaders = [
          "S.No",
          "Vehicle",
          "Vehicle Type",
          "Product",
          "Product Type",
          "Product Description",
          "Dimensions",
          "Volume",
          "Weight",
          "Capacity Used",
          "Remaining Capacity",
        ];
        aData.push(aHeaders);

        // Iterate through table items and collect data
        aItems.forEach(function (oItem) {
          var oCells = oItem.getCells();
          var rowData = [];
          oCells.forEach(function (oCell) {
            rowData.push(oCell.getText());
          });
          aData.push(rowData);
        });

        // Prepare Excel workbook
        var oSheet = XLSX.utils.aoa_to_sheet(aData);
        var oWorkbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(oWorkbook, oSheet, "idListTable");

        // Generate and download the Excel file
        XLSX.writeFile(oWorkbook, "ListOfProductsInVehicle.xlsx");
      },



      // Create fragment in products table
      onPressAddInProductsTable: async function () {
        if (!this.oCreateStarDialog) {
          this.oCreateStarDialog = await this.loadFragment("CreateDialog");
        }
        this.oCreateStarDialog.open();
      },

      onCancelInCreateProductDialog: function () {
        this.byId("idCreateProduc33tDialog").close();
      },
      // create fragment in add Eqipment page
      onPressInAddEquipment: async function () {
        if (!this.oCreateInAddEquipmentDialog) {
          this.oCreateInAddEquipmentDialog = await this.loadFragment("CreateInAddEquipment");
        }
        this.oCreateInAddEquipmentDialog.open();
      },
      onCancelInCreateVehicleDialog: function () {
        this.byId("idCreateInAddddEquipmentDialog").close();
      },
      // edit  fragment in products table
      oOpenProductEdit: async function () {
        if (!this.oEditDialog) {
          this.oEditDialog = await this.loadFragment("EditDialog");
        }
        this.oEditDialog.open();
      },
      onCancelInEditProductDialog: function () {
        this.byId("idEditProductDssialog").close();
      },
      // edit  fragment in Add equipment table
      onPressEditInAddEquipmentTable: async function () {
        if (!this.oEditInAddEquipment) {
          this.oEditInAddEquipment = await this.loadFragment("EditInAddEquipment");
        }
        this.oEditInAddEquipment.open();
      },
      onCancelInEditVehicleDialog: function () {
        this.byId("idEditInssAddEquipmentDialog").close();
      },

      //create dialog in list 
      onPressAddInListTable: async function () {
        if (!this.oCreateInListDialog) {
          this.oCreateInListDialog = await this.loadFragment("CreateInList");
        }
        this.oCreateInListDialog.open();
      },
      onCancelInListCreateDialog: function () {
        this.byId("idListssCreateDialog").close();
      },
      //edit dialog in list 
      onPressEditInListTable: async function () {
        if (!this.oListEditDialog) {
          this.oListEditDialog = await this.loadFragment("ListEditDialog");
        }
        this.oListEditDialog.open();
      },
      onCancelInListEditDialog: function () {
        this.byId("idListEdiwtDialog").close();
      },

      /** Creating New Product  */
      onCreateProduct: async function () {
        const oPayloadModel = this.getView().getModel("ProductModel"),
          oPayload = oPayloadModel.getProperty("/"),
          oModel = this.getView().getModel("ModelV2"),
          oPath = '/Materials';
        // Get the selected item from the event parameters
        var oSelectedItem = this.byId("idselectuom").getSelectedItem();
        oPayload.uom = oSelectedItem ? oSelectedItem.getKey() : "";
        var oVolume = String(oPayload.length) * String(oPayload.width) * String(oPayload.height);
        oPayload.volume = String(oVolume);
        try {
          await this.createData(oModel, oPayload, oPath);
          debugger
          this.getView().byId("ProductsTable").getBinding("items").refresh();
          this.byId("idselectuom").setSelectedKey("");
          this.ClearingModel(true);
          MessageToast.show("Successfully Created!");
        } catch (error) {
          MessageToast.show("Error at the time of creation");
        }
      },

      /**Clearing Properties after creation */
      ClearingModel: function () {
        const oPayloadModel = this.getView().getModel("ProductModel");
        oPayloadModel.setProperty("/", {
          sapProductno: "",
          length: "",
          width: "",
          height: "",
          volume: "",
          uom: "",
          mCategory: "",
          description: "",
          EANUPC: "",
          weight: "",
        })
      },

      /**Deleting Products */
      onProductDel: async function () {
        const oTable = this.byId("ProductsTable"),
          aSelectedItems = oTable.getSelectedItems(),
          oModel = this.getView().getModel("ModelV2");
        if (aSelectedItems.length === 0) {
          MessageBox.information("Please select at least one product to delete.");
          return; // Exit the function if no items are selected
        }
        try {
          await Promise.all(aSelectedItems.map(async (oItem) => {
            const oPath = oItem.getBindingContext().getPath();
            await this.deleteData(oModel, oPath);
          }));
          this.getView().byId("ProductsTable").getBinding("items").refresh();
          MessageToast.show('Successfully Deleted')
        } catch (error) {
          MessageToast.show('Error Occurs');
        }
      },

      /**Creating Vehicles */
      onCreateVeh: async function () {
        const oPayloadModel = this.getView().getModel("VehModel"),
          oPayload = oPayloadModel.getProperty("/"),
          oModel = this.getView().getModel("ModelV2"),
          oPath = '/TruckTypes';
        var oVolume = String(oPayload.length) * String(oPayload.width) * String(oPayload.height);
        oPayload.volume = String(oVolume);
        // Get the selected item from the event parameters
        var oSelectedItem = this.byId("idvehtypeUOM").getSelectedItem();
        oPayload.uom = oSelectedItem ? oSelectedItem.getKey() : "";
        try {
          await this.createData(oModel, oPayload, oPath);
          debugger
          this.getView().byId("idTruckTypeTable").getBinding("items").refresh();
          this.onCancelInCreateVehicleDialog();
          this.byId("idvehtypeUOM").setSelectedKey("");
          this.ClearVeh(true);

          MessageToast.show("Successfully Created!");
        } catch (error) {
          this.onCancelInCreateVehicleDialog();
          MessageToast.show("Error at the time of creation");
        }
      },

      /**Clearing Vehicle Model */
      ClearVeh: function () {
        const oPayloadModel = this.getView().getModel("VehModel");
        oPayloadModel.setProperty("/", {
          truckType: "",
          length: "",
          width: "",
          height: "",
          uom: "",
          volume: "",
          truckWeight: "",
          capacity: "",
        })
      },

      /**Deleting Vehicles */
      onVehDel: async function () {
        const oTable = this.byId("idTruckTypeTable"),
          aSelectedItems = oTable.getSelectedItems(),
          oModel = this.getView().getModel("ModelV2");
        if (aSelectedItems.length === 0) {
          MessageBox.information("Please select at least one product to delete.");
          return; // Exit the function if no items are selected
        }
        try {
          await Promise.all(aSelectedItems.map(async (oItem) => {
            const oPath = oItem.getBindingContext().getPath();
            await this.deleteData(oModel, oPath);
          }));
          this.getView().byId("idTruckTypeTable").getBinding("items").refresh();
          MessageToast.show('Successfully Deleted')
        } catch (error) {
          MessageToast.show('Error Occurs');
        }
      },
      onRow: function (oEvent) {
        var path = oEvent.getSource();
      },

      /**Editing vehical types */
      onEdit: async function () {
        var oSelectedItem = this.byId("idTruckTypeTable").getSelectedItem();
        if (!oSelectedItem) {
          MessageBox.information("Please select at least one Row for edit!");
          return;
        }
        const oData = oSelectedItem.getBindingContext().getObject();
        await this.onPressEditInAddEquipmentTable();
        this.byId("editTruckTypeInput").setValue(oData.truckType);
        this.byId("editLengthInput").setValue(oData.length);
        this.byId("editWidthInput").setValue(oData.width);
        this.byId("editHeightInput").setValue(oData.height);
        this.byId("editTruckWeightInput").setValue(oData.truckWeight);
        this.byId("editCapacityInput").setValue(oData.capacity);
      },

      /**Updading Edited Values */
      onSave: async function () {
        const updatedData = {
          truckType: this.byId("editTruckTypeInput").getValue(),
          length: this.byId("editLengthInput").getValue(),
          width: this.byId("editWidthInput").getValue(),
          height: this.byId("editHeightInput").getValue(),
          volume: "",
          truckWeight: this.byId("editTruckWeightInput").getValue(),
          capacity: this.byId("editCapacityInput").getValue()
        };
        const oPayload = updatedData;
        var oVolume = String(oPayload.length) * String(oPayload.width) * String(oPayload.height);
        oPayload.volume = String(oVolume);
        const truckType = this.byId("editTruckTypeInput").getValue();
        const oModel = this.getView().getModel("ModelV2");
        const oPath = `/TruckTypes('${truckType}')`;
        try {
          await this.updateData(oModel, oPayload, oPath);
          this.getView().byId("idTruckTypeTable").getBinding("items").refresh();
          this.onCancelInEditVehicleDialog();
          this.onClearEditDialog();
          MessageToast.show('Successfully Updated');
        } catch (error) {
          this.onCancelInEditVehicleDialog();
          this.onClearEditDialog();
          MessageToast.show('Error');
        }
      },

      /**Clearing Vehicle Editing Values */
      onClearEditDialog: function () {
        this.byId("editTruckTypeInput").setValue(""); // Set to empty string
        this.byId("editLengthInput").setValue(""); // Set to empty string
        this.byId("editWidthInput").setValue(""); // Set to empty string
        this.byId("editHeightInput").setValue(""); // Set to empty strin
        this.byId("editTruckWeightInput").setValue(""); // Set to empty string
        this.byId("editCapacityInput").setValue("");
      },

      /**Editing Product Details */
      onPressEditInProductsTable: async function () {
        var oSelectedItem = this.byId("ProductsTable").getSelectedItem();
        if (!oSelectedItem) {
          MessageBox.information("Please select at least one Row for edit!");
          return;
        }
        const oData = oSelectedItem.getBindingContext().getObject();
        await this.oOpenProductEdit();
        this.byId("editProductNoInput").setValue(oData.sapProductno); // SAP Product Number
        this.byId("editDescriptionInput").setValue(oData.description); // Description
        this.byId("editEANUPCInput").setValue(oData.EANUPC); // EAN/UPC Code
        this.byId("editCategoryInput").setValue(oData.mCategory); // Material Category
        this.byId("editproLengthInput").setValue(oData.length); // Length
        this.byId("editprodWidthInput").setValue(oData.width); // Width
        this.byId("editprodHeightInput").setValue(oData.height); // Height
        // this.byId("editVolumeInput").setValue(oData.volume); // Volume
        this.byId("editUOMInput").setValue(oData.uom); // Unit of Measure (UOM)
        this.byId("editWeightInput").setValue(oData.weight); // Weight
      },
      /**Updadting the Changed Product Value */
      onSaveProduct: async function () {
        const updatedData = {
          sapProductno: this.byId("editProductNoInput").getValue(), // SAP Product Number
          description: this.byId("editDescriptionInput").getValue(), // Description
          EANUPC: this.byId("editEANUPCInput").getValue(),          // EAN/UPC Code
          mCategory: this.byId("editCategoryInput").getValue(),      // Material Category
          length: this.byId("editproLengthInput").getValue(),        // Length
          width: this.byId("editprodWidthInput").getValue(),         // Width
          height: this.byId("editprodHeightInput").getValue(),       // Height
          volume: "",                                                // Volume (currently set to an empty string)
          uom: this.byId("editUOMInput").getValue(),                                                   // Unit of Measure (UOM, currently set to an empty string)
          weight: this.byId("editWeightInput").getValue()           // Weight
        };
        const oPayload = updatedData;
        var oVolume = String(oPayload.length) * String(oPayload.width) * String(oPayload.height);
        oPayload.volume = String(oVolume);
        const sapProductno = this.byId("editProductNoInput").getValue();
        const oModel = this.getView().getModel("ModelV2");
        const oPath = `/Materials('${sapProductno}')`;
        try {
          await this.updateData(oModel, oPayload, oPath);
          this.getView().byId("ProductsTable").getBinding("items").refresh();
          this.onCancelInEditProductDialog();
          this.onClearEditProdDialog();
          MessageToast.show('Successfully Updated');
        } catch (error) {
          this.onCancelInEditProductDialog();
          this.onClearEditProdDialog();
          MessageToast.show('Error');
        }

      },
      /**Clear Product Editing Dialog */
      onClearEditProdDialog: function () {
        this.byId("editProductNoInput").setValue(""); // SAP Product Number
        this.byId("editDescriptionInput").setValue(""); // Description
        this.byId("editEANUPCInput").setValue(""); // EAN/UPC Code
        this.byId("editCategoryInput").setValue(""); // Material Category
        this.byId("editproLengthInput").setValue(""); // Length
        this.byId("editprodWidthInput").setValue(""); // Width
        this.byId("editprodHeightInput").setValue(""); // Height
        // this.byId("editVolumeInput").setValue(""); // Volume (currently commented out)
         this.byId("editUOMInput").setValue(""); // Unit of Measure (UOM, currently commented out)
        this.byId("editWeightInput").setValue(""); // Weight
      },
    });
  });





